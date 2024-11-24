import { saveTrackingData, getTrackingData } from './storageUtils';

export async function determineCarrier(trackingInput) {
        //regex for testing the trackingNumber argument
        var ups = /^1Z[0-9A-Z]{16}$/;
        var fedex1 = /^\d{12}$/;
        var fedex2 = /^\d{15}$/;
        var usps1 = /^94\d{20}$/;
        var usps2 = /^92\d{20}$/;
        var usps3 = /^\d{30}$/;
        var usps4 = /^\d{26}$/;
        var usps5 = /^420\d{31}$/;
    
        // conditional logic using the test() method
        if (ups.test(trackingInput)) {
            return 'UPS';
        } else if (fedex1.test(trackingInput) || fedex2.test(trackingInput)) {
            return 'FedEx';
        } else if (usps1.test(trackingInput) || usps2.test(trackingInput) || usps3.test(trackingInput) || usps4.test(trackingInput) || usps5.test(trackingInput)) {
            return 'USPS';

        } else if (trackingInput === '') {

            console.error("No tracking number entered!");
            // statusMessage = "Unrecognized Carrier Format";
            // updateMessage(statusMessage);
            throw new Error("No tracking number entered!");

        } else {

            console.error("Unrecognized Carrier Format");
            // statusMessage = "Unrecognized Carrier Format";
            // updateMessage(statusMessage);
            throw new Error("Unrecognized Carrier Format");
        }

};

export async function checkDupe(trackingInput) {
  // Implementation from checkDupe function
  // ...
}

export async function checkInfoFound(responseBody) {
  // Implementation from checkInfoFound function
  // ...
}

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
