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
exports.EditIcon = void 0;
var utils_1 = require("./utils");
exports.EditIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M20.7392 22H3.26091C3.087 22 3 21.9127 3 21.7383C3 21.5638 3.087 21.4766 3.26091 21.4766H20.7392C20.9131 21.4766 21 21.5638 21 21.7383C21 21.8255 20.9131 22 20.7392 22Z" }),
        React.createElement("path", { d: "M7.86956 20.0808C7.7826 20.0808 7.78264 20.0808 7.69568 20.0808C7.60873 20.0808 7.60875 19.9936 7.60875 19.9064L7.43477 17.0276C7.43477 16.9404 7.43477 16.9404 7.43477 16.8532L14.3913 6.12335C14.4783 6.03612 14.6522 5.9489 14.7392 6.03614L17.6088 7.86803C17.6957 7.86803 17.6957 7.95533 17.6957 8.04257C17.6957 8.1298 17.6957 8.21699 17.6957 8.21699L10.7392 18.9468C10.7392 19.0341 10.6522 19.0341 10.6522 19.0341L7.86956 20.0808ZM7.95649 17.0276L8.13047 19.4702L10.3913 18.5979L17.174 8.12978L14.7392 6.55952L7.95649 17.0276Z" })));
};
