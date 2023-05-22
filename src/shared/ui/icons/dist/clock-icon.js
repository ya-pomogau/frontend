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
exports.ClockIcon = void 0;
var utils_1 = require("./utils");
exports.ClockIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M11.9993 21C6.98048 21 3 16.9328 3 12.0001C3 6.9808 7.06701 3 11.9993 3C17.0182 3 20.9986 7.06734 20.9986 12.0001C21.0852 17.0193 17.0182 21 11.9993 21ZM11.9993 3.43269C7.32661 3.43269 3.43266 7.24042 3.43266 12.0001C3.43266 16.6731 7.24008 20.5673 11.9993 20.5673C16.672 20.5673 20.566 16.7597 20.566 12.0001C20.566 7.32696 16.7586 3.43269 11.9993 3.43269Z" }),
        React.createElement("path", { d: "M9.23029 14.9422C9.14375 14.9422 9.05721 14.9422 9.05721 14.8557C8.97068 14.7692 8.97068 14.5961 9.05721 14.5095L11.2205 12.4327C11.307 12.3461 11.4801 12.3461 11.5667 12.4327C11.6532 12.5192 11.6532 12.6922 11.5667 12.7788L9.40336 14.8557C9.31683 14.9422 9.31682 14.9422 9.23029 14.9422Z" }),
        React.createElement("path", { d: "M11.9993 11.3941C11.8263 11.3941 11.7397 11.3076 11.7397 11.1346V5.50954C11.7397 5.33646 11.8263 5.24988 11.9993 5.24988C12.1724 5.24988 12.2589 5.33646 12.2589 5.50954V11.1346C12.2589 11.3076 12.1724 11.3941 11.9993 11.3941Z" }),
        React.createElement("path", { d: "M11.9993 12.9519C11.4801 12.9519 11.0475 12.5192 11.0475 11.9999C11.0475 11.4807 11.4801 11.0479 11.9993 11.0479C12.5185 11.0479 12.9512 11.4807 12.9512 11.9999C12.9512 12.5192 12.605 12.9519 11.9993 12.9519ZM11.9993 11.4806C11.7397 11.4806 11.4802 11.7403 11.4802 11.9999C11.4802 12.2596 11.7397 12.5192 11.9993 12.5192C12.2589 12.5192 12.5185 12.2596 12.5185 11.9999C12.5185 11.7403 12.3454 11.4806 11.9993 11.4806Z" })));
};
