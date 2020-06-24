exports.id = "main";
exports.modules = {

/***/ "./firebase.ts":
false,

/***/ "./model.ts":
false,

/***/ "./src/graphQL/resolver.ts":
/*!*********************************!*\
  !*** ./src/graphQL/resolver.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (96:12)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|     throw error;\\n| }\\n> getHistory: function (args, req) {\\n|     return __awaiter(this, void 0, void 0, function () {\\n|         var allHistory, error_1;\");\n\n//# sourceURL=webpack:///./src/graphQL/resolver.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nvar serviceAccount = __webpack_require__(/*! ../firebaseCredential.json */ \"./firebaseCredential.json\");\nvar express_graphql_1 = __importDefault(__webpack_require__(/*! express-graphql */ \"express-graphql\"));\nvar schema_1 = __importDefault(__webpack_require__(/*! ./graphQL/schema */ \"./src/graphQL/schema.ts\"));\nvar resolver_1 = __importDefault(__webpack_require__(/*! ./graphQL/resolver */ \"./src/graphQL/resolver.ts\"));\nvar authMiddleware_1 = __importDefault(__webpack_require__(/*! ./controllers/authMiddleware */ \"./src/controllers/authMiddleware.ts\"));\nvar dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar app = express_1.default();\ndotenv_1.default.config();\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(body_parser_1.default.json());\napp.use(body_parser_1.default.urlencoded({ extended: true }));\n/*\napp.get('/search-history', async (req, res)=>{\n  try{\n    const allHistory = await SearchHistory.getHistory()\n    res.status(200).json({history: allHistory})\n  }catch(error){\n    res.status(404).json({error})\n  }\n})\n\n\napp.post('/', async (req, res)=>{\n\n    const querySearch: string = req.body.querySearch\n    const geoFence : number = req.body.geoFence\n    const latitude : number  = req.body.latitude\n    const longitude : number = req.body.longitude\n    console.log(querySearch, geoFence, latitude, longitude)\n \n    interface RequestObject {\n        uri: string;\n        headers: object;\n        json: boolean;\n    }\n\n    let uri: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${querySearch}&location=${latitude},${longitude}&region=ng&radius=${geoFence}&key=${process.env.GOOGLE_API}`\n\n\n    const options: RequestObject = {\n        uri: uri,\n      \n        headers: {\n            'User-Agent': 'Request-Promise'\n        },\n        json: true\n    }\n\n    try{\n      const searchDb = new SearchHistory(\n        querySearch,\n        geoFence,\n        latitude,\n        longitude,\n        userId: ''\n      )\n      // store the class instances in the db\n      searchDb.createHistory()\n      const responseData: object = await rp(options)\n      res.status(201).json({data: responseData})\n    }catch(error){\n        console.log(error)\n        res.status(500).json({error: 'server error '})\n    }\n})\n\n*/\napp.use(authMiddleware_1.default);\napp.use('/graphql', express_graphql_1.default({\n    schema: schema_1.default,\n    rootValue: resolver_1.default,\n    graphiql: true,\n}));\nvar server = app.listen(process.env.PORT, function () {\n    console.log(\"Listening on port \" + process.env.PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "request-promise":
false

};