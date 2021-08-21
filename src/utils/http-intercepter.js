function isHistorical(v) {
  if (v && v.indexOf('historical') > 0) {
    return true
  }
  return false;
}

function notOptionMethod(v) {
  if (v && v.toLocaleLowerCase() !== 'options') {
    return true
  }
  return false
}


(function (xhr) {

  var XHR = XMLHttpRequest.prototype;

  var open = XHR.open;
  var send = XHR.send;
  var setRequestHeader = XHR.setRequestHeader;

  XHR.open = function (method, url) {
    this._method = method;
    this._url = url;
    this._requestHeaders = {};
    this._startTime = (new Date()).toISOString();
    return open.apply(this, arguments);
  };

  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value;
    return setRequestHeader.apply(this, arguments);
  };

  XHR.send = function (postData) {
    this.addEventListener('load', function () {
      var url = this._url ? this._url.toLowerCase() : this._url;
      if (url && this.responseType != 'blob' && isHistorical(url)) {
        var res = this.responseType === 'json' ? this.response : this.responseText !== '' ? JSON.parse(this.responseText) : {};
        console.log(' Data ', res, url)

        let timeFrame = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'))
        document.dispatchEvent(new CustomEvent('OHLC_DATA', { detail: { timeFrame, candles: res.data.candles } }))
      }
    });

    return send.apply(this, arguments);
  };

})(XMLHttpRequest);
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('Loaded');


})



