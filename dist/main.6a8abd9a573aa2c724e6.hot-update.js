exports.id = "main";
exports.modules = {

/***/ "./firebase.ts":
/*!*********************!*\
  !*** ./firebase.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.db = void 0;\nvar admin = __importStar(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\n// Initialize our project application\nadmin.initializeApp();\n// Set up database connection\nvar firestoreDb = admin.firestore();\nfirestoreDb.settings({ timestampsInSnapshots: true });\nexports.db = firestoreDb;\n\n\n//# sourceURL=webpack:///./firebase.ts?");

/***/ }),

/***/ "./model.ts":
/*!******************!*\
  !*** ./model.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar serviceAccount = __webpack_require__(/*! ./firebaseCredential.json */ \"./firebaseCredential.json\");\nvar admin = __importStar(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\nvar firebase_1 = __webpack_require__(/*! ./firebase */ \"./firebase.ts\");\nvar SearchHistory = /** @class */ (function () {\n    function SearchHistory(querySearch, geoFence, latitude, longitude) {\n        var _this = this;\n        this.db = admin.firestore();\n        this.createHistory = function () {\n            var docRef = firebase_1.db.collection('searchHistory').doc();\n            docRef.set({\n                querySearch: _this.querySearch,\n                geoFence: _this.geoFence,\n                latitude: _this.latitude,\n                longitude: _this.longitude,\n                ActionDate: new Date()\n            });\n        };\n        this.querySearch = querySearch;\n        this.geoFence = geoFence;\n        this.latitude = latitude;\n        this.longitude = longitude;\n        this.actionDate = new Date();\n    }\n    SearchHistory.getHistory = function () { return __awaiter(void 0, void 0, void 0, function () {\n        var db, searchCollection, result, docResult;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    db = admin.firestore();\n                    searchCollection = db.collection('searchHistory');\n                    return [4 /*yield*/, searchCollection.get()];\n                case 1:\n                    result = _a.sent();\n                    docResult = result.docs.map(function (item) { return item.data(); });\n                    return [2 /*return*/, docResult];\n            }\n        });\n    }); };\n    return SearchHistory;\n}());\nexports.default = SearchHistory;\n\n\n//# sourceURL=webpack:///./model.ts?");

/***/ })

};