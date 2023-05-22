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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.MenuIcon = void 0;
var utils_1 = require("./utils");
exports.MenuIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M21.7129 7.55554H2.28713C2.09574 7.55554 2 7.46295 2 7.27777C2 7.09258 2.09574 7 2.28713 7H21.7129C21.9043 7 22 7.09258 22 7.27777C22 7.37036 21.9043 7.55554 21.7129 7.55554Z" }),
        React.createElement("path", { d: "M21.7129 12.2779H2.28713C2.09574 12.2779 2 12.1854 2 12.0002C2 11.815 2.09574 11.7223 2.28713 11.7223H21.7129C21.9043 11.7223 22 11.815 22 12.0002C22 12.1854 21.9043 12.2779 21.7129 12.2779Z" }),
        React.createElement("path", { d: "M21.7129 17H2.28713C2.09574 17 2 16.9074 2 16.7222C2 16.537 2.09574 16.4445 2.28713 16.4445H21.7129C21.9043 16.4445 22 16.537 22 16.7222C22 16.9074 21.9043 17 21.7129 17Z" })));
};
