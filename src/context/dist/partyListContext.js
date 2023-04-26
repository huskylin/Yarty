"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.reducer = exports.partyListContext = exports.partyListInitialState = void 0;
var react_1 = require("react");
exports.partyListInitialState = {
    raw: [],
    playlist: [],
    playlistKey: ''
};
exports.partyListContext = react_1.createContext(exports.partyListInitialState);
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
function reducer(state, action) {
    switch (action.type) {
        case 'add':
            var uniqueList = __spreadArrays(state.playlist, [action.payload.playlist]).flat().filter(onlyUnique);
            return __assign(__assign({}, state), { raw: __spreadArrays(state.raw, [action.payload.raw]), playlist: uniqueList, playlistKey: action.payload.playlistKey });
        case 'reset':
            return exports.partyListInitialState;
        default:
            return exports.partyListInitialState;
    }
}
exports.reducer = reducer;
