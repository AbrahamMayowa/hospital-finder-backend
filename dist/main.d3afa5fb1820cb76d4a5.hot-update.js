exports.id = "main";
exports.modules = {

/***/ "./src/graphQL/schema.ts":
/*!*******************************!*\
  !*** ./src/graphQL/schema.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar graphql_1 = __webpack_require__(/*! graphql */ \"graphql\");\nvar schema = graphql_1.buildSchema(\"\\n\\n    input SearchInput{\\n        querySearch: String!\\n        geoFence: Int\\n        latitude: Int\\n        longitude: Int\\n        searchType: 'String\\n        userId: string!\\n    }\\n\\n    type ResultObject{\\n        formatted_address: String!\\n        name: String!\\n        user_rating_total: String!\\n    }\\n\\n\\n    type HistoryObject{\\n        latitude: Int!\\n        longitude: Int!\\n        querySearch: String!\\n    }\\n\\n    type RootQuery{\\n        getHistory:[HistoryObject]\\n    }\\n\\n    type RootMutation{\\n        createUser(password: String!, email: String!): Boolean\\n        getSearch(searchInput: SearchInput): [ResultObject]\\n    }\\n\\n    schema{\\n        query: RootQuery\\n        mutation: RootMutation\\n    }\\n\\n\\n\");\nexports.default = schema;\n\n\n//# sourceURL=webpack:///./src/graphQL/schema.ts?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ })

};