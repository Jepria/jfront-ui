var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from "styled-components";
var StyledToolbar = styled.nav(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font: 11px arial, tahoma, helvetica, sans-serif;\n  vertical-align: middle;\n  margin: 0 0 2px;\n  padding: 2px;\n  border-style: solid;\n  border-color: #99bbe8;\n  border-width: 1px 1px 1px 1px;\n  overflow: hidden;\n  background-color: #d0def0;\n  background-image: url(bg.gif);\n  background-position: 0 5%;\n"], ["\n  font: 11px arial, tahoma, helvetica, sans-serif;\n  vertical-align: middle;\n  margin: 0 0 2px;\n  padding: 2px;\n  border-style: solid;\n  border-color: #99bbe8;\n  border-width: 1px 1px 1px 1px;\n  overflow: hidden;\n  background-color: #d0def0;\n  background-image: url(bg.gif);\n  background-position: 0 5%;\n"])));
export var Toolbar = function (props) {
    return (React.createElement(StyledToolbar, __assign({}, props), props.children));
};
var templateObject_1;
//# sourceMappingURL=Toolbar.js.map