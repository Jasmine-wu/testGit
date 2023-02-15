/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n\nvar header = new _header_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ndocument.body.append(header);\nconsole.log(\"main.js is running\");\n// 模拟bug\nconsole.log2(\"main.js is running\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz81NmQ3Il0sIm5hbWVzIjpbImhlYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmQiLCJjb25zb2xlIiwibG9nIiwibG9nMiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUF1QztBQUV2QyxJQUFNQSxNQUFNLEdBQUcsSUFBSUMsa0RBQWEsRUFBRTtBQUNsQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQU0sQ0FBQ0osTUFBTSxDQUFDO0FBRTVCSyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztBQUNqQztBQUNBRCxPQUFPLENBQUNFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSBcIi4vaGVhZGVyLmpzXCJcblxuY29uc3QgaGVhZGVyID0gbmV3IGNyZWF0ZUVsZW1lbnQoKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGhlYWRlcik7XG5cbmNvbnNvbGUubG9nKFwibWFpbi5qcyBpcyBydW5uaW5nXCIpO1xuLy8g5qih5oufYnVnXG5jb25zb2xlLmxvZzIoXCJtYWluLmpzIGlzIHJ1bm5pbmdcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var el = document.createElement(\"h2\");\n  el.textContent = \"helloword\";\n  el.classList.add(\"header\");\n  el.addEventListener(\"click\", function () {\n    alert(\"hahhaha\");\n  });\n  return el;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaGVhZGVyLmpzPzExNjEiXSwibmFtZXMiOlsiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhbGVydCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZSwyRUFBTTtFQUNqQixJQUFNQSxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQztFQUN2Q0YsRUFBRSxDQUFDRyxXQUFXLEdBQUcsV0FBVztFQUM1QkgsRUFBRSxDQUFDSSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDMUJMLEVBQUUsQ0FBQ00sZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDL0JDLEtBQUssQ0FBQyxTQUFTLENBQUM7RUFDcEIsQ0FBQyxDQUFDO0VBRUYsT0FBT1AsRUFBRTtBQUNiLENBQUMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlbC50ZXh0Q29udGVudCA9IFwiaGVsbG93b3JkXCI7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBhbGVydChcImhhaGhhaGFcIilcbiAgICB9KVxuXG4gICAgcmV0dXJuIGVsO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);