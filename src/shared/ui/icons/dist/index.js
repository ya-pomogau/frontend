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
exports.Icon = void 0;
var react_1 = require("react");
var active_application_icon_1 = require("./active-application-icon");
var registration_icon_1 = require("./registration-icon");
var statistic_icon_1 = require("./statistic-icon");
var balls_icon_1 = require("./balls-icon");
var block_icon_1 = require("./block-icon");
var contacts_icon_1 = require("./contacts-icon");
var edit_icon_1 = require("./edit-icon");
var filter_icon_1 = require("./filter-icon");
var finished_application_icon_1 = require("./finished-application-icon");
var key_icon_1 = require("./key-icon");
var map_application_icon_1 = require("./map-application-icon");
var map_icon_1 = require("./map-icon");
var popular_icon_1 = require("./popular-icon");
var completed_application_icon_1 = require("./completed-application-icon");
var icons = {
    ActiveApplicationIcon: active_application_icon_1.ActiveApplicationIcon,
    BallsIcon: balls_icon_1.BallsIcon,
    BlockIcon: block_icon_1.BlockIcon,
    CompletedApplicationIcon: completed_application_icon_1.CompletedApplicationIcon,
    RegistrationIcon: registration_icon_1.RegistrationIcon,
    StatisticIcon: statistic_icon_1.StatisticIcon,
    ContactsIcon: contacts_icon_1.ContactsIcon,
    EditIcon: edit_icon_1.EditIcon,
    FilterIcon: filter_icon_1.FilterIcon,
    FinishedApplicationIcon: finished_application_icon_1.FinishedApplicationIcon,
    KeyIcon: key_icon_1.KeyIcon,
    MapApplicationIcon: map_application_icon_1.MapApplicationIcon,
    MapIcon: map_icon_1.MapIcon,
    PopularIcon: popular_icon_1.PopularIcon
};
function Icon(_a) {
    var icon = _a.icon, props = __rest(_a, ["icon"]);
    var RenderIcon = react_1.useMemo(function () { return icons[icon]; }, [icon]);
    return React.createElement(RenderIcon, __assign({}, props));
}
exports.Icon = Icon;
