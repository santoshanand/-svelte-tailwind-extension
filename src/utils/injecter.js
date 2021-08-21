/**
 * code in inject.js
 * added "web_accessible_resources": ["injected.js"] to manifest.json
 */

var scriptElm = document.createElement('script');
scriptElm.type = "module";
scriptElm.onload = function () {
  this.remove();
};
scriptElm.src = chrome.extension.getURL('utils/zepto.min.js');
document.body.appendChild(scriptElm);

var s = document.createElement('script');
s.src = chrome.extension.getURL('utils/http-intercepter.js');
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);


