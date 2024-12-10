import { saveTrackingData, getTrackingData } from './storageUtils';
const { chromium } = require('playwright');


export async function determineCarrier(trackingInput) {

    const regexPatterns = {

      //regex to determine carrier
        UPS: /^1Z[0-9A-Z]{16}$/,
        FedEx: [/^\d{12}$/, /^\d{15}$/],
        USPS: [/^94\d{20}$/, /^92\d{20}$/, /^\d{30}$/, /^\d{26}$/, /^420\d{31}$/]
    };

    //if no tracking number entered, return/throw error
    if (trackingInput === '') {
        console.error("No tracking number entered!");
        throw new Error("No tracking number entered!");
    }

    //test patterns to determine carrier
    if (regexPatterns.UPS.test(trackingInput)) {
        return 'UPS';
      //syntax reminder: test regexPatterns, for the Fedex key's values, and see if at 
      //least 'some' of the things in the Fedex array passes the test in the some method
    } else if (regexPatterns.FedEx.some(pattern => pattern.test(trackingInput))) {
        return 'FedEx';
    } else if (regexPatterns.USPS.some(pattern => pattern.test(trackingInput))) {
        return 'USPS';
    } else {
        console.error("Unrecognized Carrier Format");
        throw new Error("Unrecognized Carrier Format");
    }
}

export async function checkDupe(trackingInput) {
    //check if duplicate exists aka tracking number is already being tracked
    let dupeData = await chrome.storage.local.get(trackingInput);
    if (dupeData.hasOwnProperty(trackingInput)) {
        statusMessage = "Tracking number already exists!";
        console.log("Tracking number already exists!");
        updateMessage(statusMessage, "warning");
        throw new Error("Tracking number already exists!");
    }
};

export const getTrackingData = async (carrier) => {
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    let status, etaDate, progressVal;
  
    const trackUPS = async () => {
        await page.goto(`https://www.ups.com/track?loc=en_US&tracknum=${trackingInput}`);
        
        // Add any UPS-specific actions here
    };

    const trackFedEx = async () => {

        await page.goto(`https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingNumber}`);
        

        // if tracking number is not found or there is some error
        if (await page.locator('.systemErrorTop').count() > 0) {
          status = 'Status Not Available';
          etaDate = 'N/A';
          progressVal = 0;
          
        } else {
          
          status = await page.locator('trk-shared-shipment-delivery-status .fdx-c-heading.fdx-c-heading--h5').textContent().trim();
          progressVal = await page.locator('.shipment-status-progress-bar-track-overlay').evaluate((el) => {
          const heightStyle = window.getComputedStyle(el).height;
          if (heightStyle.includes('%')) {
              return '100'; 
          } else {
              return Math.floor((parseFloat(heightStyle)/335)*100);
          }
          });
        
          etaDate = await page.locator('.deliveryDateTextBetween').textContent().split(' at ')[0];
        };

    }
    const trackUSPS = async () => {
        await page.goto(`https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingInput}`);
          

        //if shipping status is not available
        if (await page.locator('latest-update-banner-wrapper red-banner').count() > 0) {
          
          //if information/package not found
          if (await page.locator('.red-banner .banner-header').textContent() === 'Status Not Available') {
            status = 'Status Not Available';

          //otherwise get pre ship information 
          } else {
            status = await page.locator('.red-banner .banner-header').textContent()
              .then(text => text.trim().replace(/\s+/g, ' '));
          }
          etaDate = 'N/A'; 
          progressVal = 0;
        
        //if package has been delivered  
        } else if (await page.locator('.tracking-progress-bar-status-container.delivered-status').count() > 0) {
            // date format for this status is 'November 5, 2024, 6:10 am' in one string
            const dateWithTime = await page.locator('.eta_snip .date').textContent().trim().split(',')
            etaDate = dateWithTime[0]+', '+dateWithTime[1];
            status = await page.locator('.tb-step.current-step .tb-status').textContent();
            progressVal = 100;
        
        // if package is in progress  
        } else if (await page.locator('.eta_wrap').count() > 0) {
          
          // check if there's a date
          if (await page.locator('.eta_snip .date').count() > 0) {
            // date format for this status is across different spans, ('day', 'month', 'year') 
              const day = await page.locator('.eta_snip .date').textContent();
              const month = await page.locator('.month_year span').first().textContent();
              const fullText = await page.locator('.month_year').textContent();
              const year = fullText.split(' ')[1];
              etaDate = month+', '+day+' '+year;
              progressVal = Math.floor((await page.locator('.tracking-progress-bar-status-container.in-transit-status div').count()/20)*100);  

          // otherwise set date, month, year to N/A
          } else {
            etaDate = 'N/A';
            progressVal = 0;
          } 
          // status should still exist
          status = await page.locator('.tb-step.current-step .tb-status-detail').textContent();
        }     

        return createTrackingData(carrier, trackingInput, status, progressVal, etaDate);
    }

    // mapping for carriers to their respective functions
    const carrierActions = {
        UPS: trackUPS,
        FedEx: trackFedEx,
        USPS: trackUSPS
    };

    // execute the action based on the carrier
    if (carrierActions[carrier]) {
        await carrierActions[carrier]();
    } else {
        console.error("Unsupported carrier");
        throw new Error("Unsupported carrier");
    }

    



};


const createTrackingData = (carrier, trackingInput, status, progressVal, etaDate) => {
  return {
      carrier: carrier,
      trackingNumber: trackingInput,
      status: status,
      progress: progressVal,
      ETA: etaDate
  };
};

export async function saveToChromeStorage(responseBody) {
  // Implementation from saveToChromeStorage function
  // ...
}



export async function refreshTrackingData(trackingNumbers) {
  const refreshedData = await Promise.all(
    trackingNumbers.map(async (tracking) => {
      if (tracking.carrier !== "USPS") {
        const responseBody = await sendToLambda(tracking.trackingNumber, tracking.carrier);
        return responseBody || tracking; // fallback to existing data if refresh fails
      }
      return tracking; // return existing data for USPS
    })
  );

  await saveTrackingData(refreshedData);
  return refreshedData;
}

export async function addTrackingNumber(trackingInput) {
  const carrierID = await determineCarrier(trackingInput);
  
  let responseBody;
  if (carrierID !== "USPS") {
    responseBody = await sendToLambda(trackingInput, carrierID);
  } else {
    responseBody = {"carrier": carrierID, "trackingNumber": trackingInput, "Details": "Not Implemented"};
  }

  if (responseBody) {
    await checkInfoFound(responseBody);
    const currentData = await getTrackingData();
    await saveTrackingData([...currentData, responseBody]);
    return responseBody;
  } else {
    throw new Error("No response received for tracking number");
  }
}
