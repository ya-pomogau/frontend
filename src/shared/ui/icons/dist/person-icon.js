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
exports.PersonIcon = void 0;
var utils_1 = require("./utils");
exports.PersonIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M11.8882 11.8039C9.27122 11.8039 7.21502 9.54897 7.21502 6.90193C7.21502 4.15685 9.36468 2 11.8882 2C14.5052 2 16.5614 4.25489 16.5614 6.90193C16.5614 9.54897 14.5052 11.8039 11.8882 11.8039ZM11.8882 2.49019C9.55161 2.49019 7.68233 4.45099 7.68233 6.80391C7.68233 9.25487 9.55161 11.2156 11.8882 11.2156C14.2248 11.2156 16.0006 9.25487 16.0006 6.80391C16.0941 4.45099 14.2248 2.49019 11.8882 2.49019Z" }),
        React.createElement("path", { d: "M17.7764 22H6.28038C6.09345 22 6 21.9019 6 21.7058V17.4903C6 13.9609 8.71047 11.2158 11.9817 11.2158C15.3464 11.2158 17.9633 14.0589 17.9633 17.4903V21.7058C18.0568 21.9019 17.9633 22 17.7764 22ZM17.496 21.4118V17.4903C17.496 14.353 15.066 11.706 11.9817 11.706C8.8974 11.706 6.46732 14.255 6.46732 17.4903V21.4118H17.496Z" })));
};
