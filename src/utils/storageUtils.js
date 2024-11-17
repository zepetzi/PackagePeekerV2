export const getTrackingData = () => {
//   return new Promise((resolve) => {
//     chrome.storage.local.get(null, (items) => {
//       resolve(Object.values(items));
//     });
//   });
};

export const saveTrackingData = (data) => {
//   return new Promise((resolve) => {
//     chrome.storage.local.set({ [data.trackingNumber]: data }, resolve);
//   });
};

export const removeTrackingData = (trackingNumber) => {
//   return new Promise((resolve) => {
//     chrome.storage.local.remove(trackingNumber, resolve);
//   });
};
