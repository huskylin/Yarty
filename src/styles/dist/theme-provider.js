"use strict";
exports.__esModule = true;
var styled_components_1 = require("styled-components");
var antd_1 = require("antd");
var react_1 = require("react");
function t(_a) {
    var children = _a.children;
    var token = antd_1.theme.useToken().token;
    return (react_1["default"].createElement(styled_components_1.ThemeProvider, { theme: { antd: token, base: { color: 'mediumseagreen' } } }, children));
}
exports["default"] = t;
