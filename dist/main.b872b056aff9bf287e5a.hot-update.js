exports.id = "main";
exports.modules = {

/***/ "./graphQL/resolver.ts":
/*!*****************************!*\
  !*** ./graphQL/resolver.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar model_1 = __importDefault(__webpack_require__(/*! ../model */ \"./model.ts\"));\nvar serviceAccount = __webpack_require__(/*! ../firebaseCredential.json */ \"./firebaseCredential.json\");\nvar request_promise_1 = __importDefault(__webpack_require__(/*! request-promise */ \"request-promise\"));\nvar db = __webpack_require__(/*! ../firebase */ \"./firebase.ts\");\nvar mainResolver = {\n    //resolve places finding logic and populate user search history\n    getSearch: function (_a, req) {\n        var querySearch = _a.querySearch, geoFence = _a.geoFence, latitude = _a.latitude, longitude = _a.longitude, searchType = _a.searchType;\n        return __awaiter(this, void 0, void 0, function () {\n            var uri, options, userId, searchDb, responseData;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        uri = \"https://maps.googleapis.com/maps/api/place/textsearch/json?query=\" + querySearch + \"&location=\" + latitude + \",\" + longitude + \"&region=ng&radius=\" + geoFence + \"&key=\" + process.env.GOOGLE_API;\n                        options = {\n                            uri: uri,\n                            headers: {\n                                'User-Agent': 'Request-Promise'\n                            },\n                            json: true\n                        };\n                        userId = req.userId;\n                        searchDb = new model_1.default(querySearch, geoFence, latitude, longitude, userId);\n                        // store the class instances in the db\n                        searchDb.createHistory();\n                        return [4 /*yield*/, request_promise_1.default(options)\n                            //return array of object\n                        ];\n                    case 1:\n                        responseData = _b.sent();\n                        //return array of object\n                        return [2 /*return*/, responseData.data.results.map(function (item) { return ({\n                                formatted_address: item.formatted_address,\n                                name: item.name,\n                                user_rating_total: item.user_rating_total\n                            }); })];\n                }\n            });\n        });\n    },\n    getHistory: function (args, req) {\n        return __awaiter(this, void 0, void 0, function () {\n            var allHistory;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        if (!req.userId) {\n                            //user is not authenticated\n                            throw Error('Access Forbidding');\n                        }\n                        return [4 /*yield*/, model_1.default.getHistory(req.userId)];\n                    case 1:\n                        allHistory = _a.sent();\n                        return [2 /*return*/, allHistory.map(function (item) {\n                                return {\n                                    latitude: item.latitude,\n                                    longitude: item.longitude,\n                                    querySearch: item.querySearch\n                                };\n                            })];\n                }\n            });\n        });\n    }\n};\nexports.default = mainResolver;\n\n\n//# sourceURL=webpack:///./graphQL/resolver.ts?");

/***/ }),

/***/ "./model.ts":
/*!******************!*\
  !*** ./model.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (95:44)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|                     result = _a.sent();\\n|                     // only search history of authenticated user will be return\\n>                     console.log(result.docs.);\\n|                     return [2 /*return*/, result.docs.filter(function (item) { return item.data(); })\\n|                         //return docResult.filter(item=> item.userId === userId)\");\n\n//# sourceURL=webpack:///./model.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nvar serviceAccount = __webpack_require__(/*! ../firebaseCredential.json */ \"./firebaseCredential.json\");\nvar express_graphql_1 = __importDefault(__webpack_require__(/*! express-graphql */ \"express-graphql\"));\nvar schema_1 = __importDefault(__webpack_require__(/*! ../graphQL/schema */ \"./graphQL/schema.ts\"));\nvar resolver_1 = __importDefault(__webpack_require__(/*! ../graphQL/resolver */ \"./graphQL/resolver.ts\"));\nvar authMiddleware_1 = __importDefault(__webpack_require__(/*! ./controllers/authMiddleware */ \"./src/controllers/authMiddleware.ts\"));\nvar dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar app = express_1.default();\ndotenv_1.default.config();\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(body_parser_1.default.json());\napp.use(body_parser_1.default.urlencoded({ extended: true }));\n/*\napp.get('/search-history', async (req, res)=>{\n  try{\n    const allHistory = await SearchHistory.getHistory()\n    res.status(200).json({history: allHistory})\n  }catch(error){\n    res.status(404).json({error})\n  }\n})\n\n\napp.post('/', async (req, res)=>{\n\n    const querySearch: string = req.body.querySearch\n    const geoFence : number = req.body.geoFence\n    const latitude : number  = req.body.latitude\n    const longitude : number = req.body.longitude\n    console.log(querySearch, geoFence, latitude, longitude)\n \n    interface RequestObject {\n        uri: string;\n        headers: object;\n        json: boolean;\n    }\n\n    let uri: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${querySearch}&location=${latitude},${longitude}&region=ng&radius=${geoFence}&key=${process.env.GOOGLE_API}`\n\n\n    const options: RequestObject = {\n        uri: uri,\n      \n        headers: {\n            'User-Agent': 'Request-Promise'\n        },\n        json: true\n    }\n\n    try{\n      const searchDb = new SearchHistory(\n        querySearch,\n        geoFence,\n        latitude,\n        longitude,\n        userId: ''\n      )\n      // store the class instances in the db\n      searchDb.createHistory()\n      const responseData: object = await rp(options)\n      res.status(201).json({data: responseData})\n    }catch(error){\n        console.log(error)\n        res.status(500).json({error: 'server error '})\n    }\n})\n\n*/\napp.use(authMiddleware_1.default);\napp.use('/graphql', express_graphql_1.default({\n    schema: schema_1.default,\n    rootValue: resolver_1.default,\n    graphiql: true,\n}));\nvar server = app.listen(process.env.PORT, function () {\n    console.log(\"Listening on port \" + process.env.PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

};