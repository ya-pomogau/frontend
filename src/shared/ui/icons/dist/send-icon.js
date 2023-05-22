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
exports.SendIcon = void 0;
var utils_1 = require("./utils");
exports.SendIcon = function (_a) {
    var color = _a.color, _b = _a.size, size = _b === void 0 ? "24" : _b, props = __rest(_a, ["color", "size"]);
    return (React.createElement("svg", __assign({ width: size, height: size, viewBox: "0 0 24 24", fill: utils_1.getColor(color), xmlns: "http://www.w3.org/2000/svg" }, props),
        React.createElement("path", { d: "M20.5489 2.97342L20.5486 2.97293L20.5398 2.97841L3.03489 13.808L3.02574 13.8137L3.018 13.8212C2.89994 13.9353 2.89998 14.0569 2.9 14.1433L2.9 14.1469C2.9 14.2229 2.93821 14.2897 2.98517 14.3351C3.02718 14.3757 3.08534 14.4082 3.1506 14.4149L7.56385 16.4224L9.64074 20.8561C9.64804 20.9216 9.68286 20.9787 9.72455 21.019C9.77173 21.0646 9.8393 21.1 9.9144 21.1C9.98723 21.1 10.0509 21.0662 10.0889 21.0418C10.1094 21.0286 10.1263 21.0155 10.1382 21.0056C10.1415 21.0029 10.1445 21.0004 10.1471 20.9981C10.1491 20.9963 10.1509 20.9947 10.1525 20.9933L10.1568 20.9894L10.1581 20.9881L10.1586 20.9877L10.1588 20.9875L10.1589 20.9874L10.1589 20.9874L10.0895 20.9154L10.1589 20.9873L10.1679 20.9787L10.1744 20.9682L20.94 3.62384L20.9402 3.624L20.9438 3.61704C21.0306 3.44924 21.0824 3.32952 21.0961 3.23671C21.1035 3.18697 21.1008 3.13993 21.0838 3.09526C21.0671 3.05132 21.0396 3.01825 21.012 2.99156C20.9542 2.93572 20.8867 2.9 20.8003 2.9C20.7219 2.9 20.6392 2.92974 20.5489 2.97342ZM11.5954 11.706L11.5953 11.706L11.593 11.7083L7.79048 15.6348L4.00207 13.963L19.671 4.302L10.0149 19.8589L8.28346 16.1131L12.0858 12.187C12.1522 12.1219 12.1806 12.0309 12.1806 11.9471C12.1806 11.8628 12.1519 11.7711 12.0845 11.706C12.0176 11.6413 11.9245 11.6145 11.8399 11.6145C11.7554 11.6145 11.6623 11.6413 11.5954 11.706Z" })));
};
