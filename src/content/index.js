import $ from 'jquery'

let res = {};
$(document).ready(() => {
  document.addEventListener('OHLC_DATA', (e) => {
    console.log('Data ', e.detail)
    // res = e.detail
    res[e.detail.timeFrame] = e.detail.candles
  })
});

chrome.runtime.onMessage.addListener(onMessageProc);

function onMessageProc(request, sender, sendResponse) {
  console.log(request);

  if (request.action === "all-data") {
    sendResponse(res);
  } else if (request.action === "search") {
    const input = document.getElementById('search-input')
    // console.log(request.symbol, input);
    // $('#search-input')[0].blur()
    // $('#search-input')[0].dispatchEvent(new KeyboardEvent('keypress', { 'key': 'V' }))
    // // input.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'h' }));
    // console.log(request.symbol, input);
    // $('#search-input')[0].dispatchEvent(new MouseEvent("click"))


    // $('#search-input').focus()
    // $('.orders-nav-item').trigger('click')
    // $('.info').trigger('mouseover')
    // $('.orders-nav-item').trigger('click')

    window.postMessage(request, '*')
    // $('#search-input').val(request.symbol)
  }
}

