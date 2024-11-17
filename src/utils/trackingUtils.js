import { saveTrackingData, getTrackingData } from './storageUtils';

export async function determineCarrier(trackingNumber) {
  // Implementation from trackingInputValidation function
  // ...
}

export async function checkDupe(trackingInput) {
  // Implementation from checkDupe function
  // ...
}

export async function sendToLambda(trackingNumber, carrier) {
  // Implementation from sendToLambda function
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
