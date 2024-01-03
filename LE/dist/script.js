/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


window.onload = function () {
  var button = document.getElementById("switch");
  var headvalue = document.querySelector("head");
  var link = document.createElement("link");
  var style = 0;
  var switcher = function switcher() {
    var firstLink = document.getElementsByTagName("link")[0];
    firstLink.parentNode.removeChild(firstLink);
    if (style == 1) {
      headvalue.appendChild(link);
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "css/1.css");
      link.setAttribute("type", "text/css");
    } else {
      headvalue.appendChild(link);
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "css/2.css");
      link.setAttribute("type", "text/css");
    }
    if (style == 1) {
      style = 2;
    } else {
      style = 1;
    }
  };
  button.addEventListener("click", switcher);
};
/******/ })()
;