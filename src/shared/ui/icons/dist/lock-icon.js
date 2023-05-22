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
exports.LockIcon = void 0;
var utils_1 = require("./utils");
exports.LockIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M19.6981 22H4.30187C4.10062 22 4 21.902 4 21.706V9.64702C4 9.45094 4.10062 9.35298 4.30187 9.35298H19.6981C19.8994 9.35298 20 9.45094 20 9.64702V21.706C20 21.902 19.7988 22 19.6981 22ZM4.60381 21.4118H19.3962V9.94119H4.60381V21.4118Z" }),
        React.createElement("path", { d: "M17.0817 9.94125C16.8805 9.94125 16.7799 9.84316 16.7799 9.64708V7.09808C16.7799 4.54904 14.566 2.4902 11.9497 2.4902C9.33335 2.4902 7.11953 4.54904 7.11953 7.09808V9.64708C7.11953 9.84316 7.01885 9.94125 6.81759 9.94125C6.61634 9.94125 6.51572 9.84316 6.51572 9.64708V7.09808C6.51572 4.25492 8.93083 2 11.9497 2C14.9686 2 17.3836 4.35296 17.3836 7.09808V9.64708C17.3836 9.84316 17.283 9.94125 17.0817 9.94125Z" }),
        React.createElement("path", { d: "M11.9497 17.7845C11.7484 17.7845 11.6478 17.6864 11.6478 17.4903V13.8629C11.6478 13.6668 11.7484 13.5687 11.9497 13.5687C12.151 13.5687 12.2516 13.6668 12.2516 13.8629V17.4903C12.2516 17.6864 12.151 17.7845 11.9497 17.7845Z" })));
};
