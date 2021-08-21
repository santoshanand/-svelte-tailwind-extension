import { isArray } from "lodash";

export function getData(action, timeFrame) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { action: action }, (res) => {
          if (!window.chrome.runtime.lastError) { }
          const dataArray = filterData(timeFrame, res)
          const candles = getNumbersOfCandles(dataArray)
          resolve(candles)
        });
      }
    });
  })
}


export function searchSymbol(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, action, (res) => {
        if (!window.chrome.runtime.lastError) { }
      });
    }
  });
}
function filterData(timeFrame, data) {
  if (timeFrame) {
    return data[timeFrame] || []
  }
  return data['day'] || []
}

function getNumbersOfCandles(resArray, dataCount) {
  if (!dataCount) {
    dataCount = 10;
  }
  if (isArray(resArray)) {
    return resArray.slice(resArray.length - dataCount, resArray.length - 1)
  }
  return resArray;
}