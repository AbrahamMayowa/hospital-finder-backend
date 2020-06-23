exports.id = "main";
exports.modules = {

/***/ "./firebase.ts":
false,

/***/ "./graphQL/resolver.ts":
/*!*****************************!*\
  !*** ./graphQL/resolver.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (76:12)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|         });\\n|     },\\n>     export: , default: mainResolver\\n| };\\n| \");\n\n//# sourceURL=webpack:///./graphQL/resolver.ts?");

/***/ }),

/***/ "./model.ts":
false,

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nvar serviceAccount = __webpack_require__(/*! ../firebaseCredential.json */ \"./firebaseCredential.json\");\nvar express_graphql_1 = __importDefault(__webpack_require__(/*! express-graphql */ \"express-graphql\"));\nvar schema_1 = __importDefault(__webpack_require__(/*! ../graphQL/schema */ \"./graphQL/schema.ts\"));\nvar resolver_1 = __importDefault(__webpack_require__(/*! ../graphQL/resolver */ \"./graphQL/resolver.ts\"));\nvar dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar app = express_1.default();\ndotenv_1.default.config();\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(body_parser_1.default.json());\napp.use(body_parser_1.default.urlencoded({ extended: true }));\napp.use('/graphql', express_graphql_1.default({\n    schema: schema_1.default,\n    rootValue: resolver_1.default,\n    graphiql: true,\n}));\nvar server = app.listen(process.env.PORT, function () {\n    console.log(\"Listening on port \" + process.env.PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "firebase-admin":
false,

/***/ "request-promise":
false

};