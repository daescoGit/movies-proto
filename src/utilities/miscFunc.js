export const RandomNr = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const addToStorage = (mediaEntryID, type) => {
  localStorage.setItem(mediaEntryID, type + mediaEntryID);
}

export const getFromStorage = (mediaEntryID) => {
  return localStorage.getItem(mediaEntryID);
}

export const removeFromStorage = (mediaEntryID) => {
  localStorage.removeItem(mediaEntryID);
}

export const getAllFromStorage = () => {
  const keys = Object.keys(localStorage);
  return keys.map(key => localStorage.getItem(key));
}

// billed format
export const filterByFormat = (formatArray, mediaEntry) => {
  const thumbsArray = Object.values(mediaEntry.plprogram$thumbnails);
  return thumbsArray.filter(thumb => thumb.plprogram$assetTypes.some(type => formatArray.includes(type)));
}