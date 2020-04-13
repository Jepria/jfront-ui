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
import React from "react";
import { Hello } from "./Hello";
export var App = function (props) {
    var _a = React.useState('Moscow'), name = _a[0], setName = _a[1];
    return (React.createElement("div", null,
        React.createElement(Hello, __assign({}, { name: name }))));
};
