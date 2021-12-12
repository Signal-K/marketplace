/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/api/projects";
exports.ids = ["pages/api/projects"];
exports.modules = {

/***/ "./pages/api/projects/index.js":
/*!*************************************!*\
  !*** ./pages/api/projects/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cotter_token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cotter-token-js */ \"cotter-token-js\");\n/* harmony import */ var cotter_token_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cotter_token_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst {\n  Pool\n} = __webpack_require__(/*! pg */ \"pg\");\n\nconst connectionString = process.env.PG_CONNECTION_STRING;\nconst pool = new Pool({\n  connectionString\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (async (req, res) => {\n  // Check that the authorization header exists\n  if (!(\"authorization\" in req.headers)) {\n    res.statusCode = 401;\n    res.end(\"Authorization header missing\");\n  } // Extract the token string\n\n\n  const auth = await req.headers.authorization;\n  const bearer = auth.split(\" \");\n  const token = bearer[1];\n\n  try {\n    // Decode the Cotter JWT, \"decoded.payload.identifier\" is the user's email\n    const decoded = new cotter_token_js__WEBPACK_IMPORTED_MODULE_0__.CotterAccessToken(token); // Get design_projects by clients.email\n    // Query credit: https://www.garysieling.com/blog/postgres-join-on-an-array-field/\n\n    const query = `select design_projects.*\n                       from design_projects\n                                join clients on clients.id = ANY (design_projects.client)\n                       where clients.email like $1;`;\n    const {\n      rows\n    } = await pool.query(query, [decoded.payload.identifier]); // Respond with results\n\n    res.statusCode = 200;\n    res.json(rows);\n  } catch (e) {\n    // Handle any errors\n    console.log(e);\n    res.statusCode = 500;\n    res.end(\"Server error. Something went wrong.\");\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LXRyYWNrZXIvLi9wYWdlcy9hcGkvcHJvamVjdHMvaW5kZXguanM/OTZjMCJdLCJuYW1lcyI6WyJQb29sIiwicmVxdWlyZSIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiUEdfQ09OTkVDVElPTl9TVFJJTkciLCJwb29sIiwicmVxIiwicmVzIiwiaGVhZGVycyIsInN0YXR1c0NvZGUiLCJlbmQiLCJhdXRoIiwiYXV0aG9yaXphdGlvbiIsImJlYXJlciIsInNwbGl0IiwidG9rZW4iLCJkZWNvZGVkIiwiQ290dGVyQWNjZXNzVG9rZW4iLCJxdWVyeSIsInJvd3MiLCJwYXlsb2FkIiwiaWRlbnRpZmllciIsImpzb24iLCJlIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0FBQ0EsTUFBTTtBQUFDQTtBQUFELElBQVNDLG1CQUFPLENBQUMsY0FBRCxDQUF0Qjs7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLG9CQUFyQztBQUNBLE1BQU1DLElBQUksR0FBRyxJQUFJTixJQUFKLENBQVM7QUFDbEJFO0FBRGtCLENBQVQsQ0FBYjtBQUlBLCtEQUFlLE9BQU9LLEdBQVAsRUFBWUMsR0FBWixLQUFvQjtBQUMvQjtBQUNBLE1BQUksRUFBRSxtQkFBbUJELEdBQUcsQ0FBQ0UsT0FBekIsQ0FBSixFQUF1QztBQUNuQ0QsT0FBRyxDQUFDRSxVQUFKLEdBQWlCLEdBQWpCO0FBQ0FGLE9BQUcsQ0FBQ0csR0FBSixDQUFRLDhCQUFSO0FBQ0gsR0FMOEIsQ0FPL0I7OztBQUNBLFFBQU1DLElBQUksR0FBRyxNQUFNTCxHQUFHLENBQUNFLE9BQUosQ0FBWUksYUFBL0I7QUFDQSxRQUFNQyxNQUFNLEdBQUdGLElBQUksQ0FBQ0csS0FBTCxDQUFXLEdBQVgsQ0FBZjtBQUNBLFFBQU1DLEtBQUssR0FBR0YsTUFBTSxDQUFDLENBQUQsQ0FBcEI7O0FBRUEsTUFBSTtBQUNBO0FBQ0EsVUFBTUcsT0FBTyxHQUFHLElBQUlDLDhEQUFKLENBQXNCRixLQUF0QixDQUFoQixDQUZBLENBSUE7QUFDQTs7QUFDQSxVQUFNRyxLQUFLLEdBQUk7QUFDdkI7QUFDQTtBQUNBLG9EQUhRO0FBSUEsVUFBTTtBQUFDQztBQUFELFFBQVMsTUFBTWQsSUFBSSxDQUFDYSxLQUFMLENBQVdBLEtBQVgsRUFBa0IsQ0FBQ0YsT0FBTyxDQUFDSSxPQUFSLENBQWdCQyxVQUFqQixDQUFsQixDQUFyQixDQVZBLENBWUE7O0FBQ0FkLE9BQUcsQ0FBQ0UsVUFBSixHQUFpQixHQUFqQjtBQUNBRixPQUFHLENBQUNlLElBQUosQ0FBU0gsSUFBVDtBQUNILEdBZkQsQ0FlRSxPQUFPSSxDQUFQLEVBQVU7QUFDUjtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNBaEIsT0FBRyxDQUFDRSxVQUFKLEdBQWlCLEdBQWpCO0FBQ0FGLE9BQUcsQ0FBQ0csR0FBSixDQUFRLHFDQUFSO0FBQ0g7QUFDSixDQWpDRCIsImZpbGUiOiIuL3BhZ2VzL2FwaS9wcm9qZWN0cy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q290dGVyQWNjZXNzVG9rZW59IGZyb20gXCJjb3R0ZXItdG9rZW4tanNcIjtcbmNvbnN0IHtQb29sfSA9IHJlcXVpcmUoJ3BnJyk7XG5jb25zdCBjb25uZWN0aW9uU3RyaW5nID0gcHJvY2Vzcy5lbnYuUEdfQ09OTkVDVElPTl9TVFJJTkc7XG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xuICAgIGNvbm5lY3Rpb25TdHJpbmcsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgYXV0aG9yaXphdGlvbiBoZWFkZXIgZXhpc3RzXG4gICAgaWYgKCEoXCJhdXRob3JpemF0aW9uXCIgaW4gcmVxLmhlYWRlcnMpKSB7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAxO1xuICAgICAgICByZXMuZW5kKFwiQXV0aG9yaXphdGlvbiBoZWFkZXIgbWlzc2luZ1wiKTtcbiAgICB9XG5cbiAgICAvLyBFeHRyYWN0IHRoZSB0b2tlbiBzdHJpbmdcbiAgICBjb25zdCBhdXRoID0gYXdhaXQgcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcbiAgICBjb25zdCBiZWFyZXIgPSBhdXRoLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCB0b2tlbiA9IGJlYXJlclsxXTtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIERlY29kZSB0aGUgQ290dGVyIEpXVCwgXCJkZWNvZGVkLnBheWxvYWQuaWRlbnRpZmllclwiIGlzIHRoZSB1c2VyJ3MgZW1haWxcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IG5ldyBDb3R0ZXJBY2Nlc3NUb2tlbih0b2tlbik7XG5cbiAgICAgICAgLy8gR2V0IGRlc2lnbl9wcm9qZWN0cyBieSBjbGllbnRzLmVtYWlsXG4gICAgICAgIC8vIFF1ZXJ5IGNyZWRpdDogaHR0cHM6Ly93d3cuZ2FyeXNpZWxpbmcuY29tL2Jsb2cvcG9zdGdyZXMtam9pbi1vbi1hbi1hcnJheS1maWVsZC9cbiAgICAgICAgY29uc3QgcXVlcnkgPSBgc2VsZWN0IGRlc2lnbl9wcm9qZWN0cy4qXG4gICAgICAgICAgICAgICAgICAgICAgIGZyb20gZGVzaWduX3Byb2plY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpvaW4gY2xpZW50cyBvbiBjbGllbnRzLmlkID0gQU5ZIChkZXNpZ25fcHJvamVjdHMuY2xpZW50KVxuICAgICAgICAgICAgICAgICAgICAgICB3aGVyZSBjbGllbnRzLmVtYWlsIGxpa2UgJDE7YDtcbiAgICAgICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgcG9vbC5xdWVyeShxdWVyeSwgW2RlY29kZWQucGF5bG9hZC5pZGVudGlmaWVyXSk7XG5cbiAgICAgICAgLy8gUmVzcG9uZCB3aXRoIHJlc3VsdHNcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XG4gICAgICAgIHJlcy5qc29uKHJvd3MpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvcnNcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICByZXMuZW5kKFwiU2VydmVyIGVycm9yLiBTb21ldGhpbmcgd2VudCB3cm9uZy5cIik7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/projects/index.js\n");

/***/ }),

/***/ "cotter-token-js":
/*!**********************************!*\
  !*** external "cotter-token-js" ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = require("cotter-token-js");;

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ (function(module) {

"use strict";
module.exports = require("pg");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/api/projects/index.js"));
module.exports = __webpack_exports__;

})();