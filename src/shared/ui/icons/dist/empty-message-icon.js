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
exports.EmptyMessageIcon = void 0;
var utils_1 = require("./utils");
exports.EmptyMessageIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M7.59781 22H7.50001C7.40218 22 7.30434 21.9021 7.30434 21.7065V17.9892H3.29347C3.09781 17.9892 3 17.8913 3 17.6956V4.29353C3 4.09787 3.09781 4 3.29347 4H20.7065C20.9022 4 21 4.09787 21 4.29353V17.6956C21 17.8913 20.9022 17.9892 20.7065 17.9892H12.0978L7.79347 21.9022C7.69565 21.9022 7.59781 22 7.59781 22ZM3.48913 17.4022H7.50001C7.69566 17.4022 7.79347 17.5 7.79347 17.6956V21.1195L11.7065 17.5C11.8043 17.5 11.8044 17.4022 11.9022 17.4022H20.3152V4.58693H3.48913V17.4022V17.4022Z" })));
};
