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
import styled from 'styled-components';
var StyledButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  cursor: pointer;\n  border: solid 1px transparent;\n  height: 22px;\n  padding: 1px 1px;\n  background-color: transparent;\n  background-image: none;\n  float: left;\n  vertical-align: middle;\n  text-align: center;\n  &:disabled {\n    opacity: 0.5;\n    background: transparent;\n    cursor: default;\n  }\n  &:hover {\n    border: solid 1px #99bbe8;\n    background: #ddefff;\n  }\n"], ["\n  cursor: pointer;\n  border: solid 1px transparent;\n  height: 22px;\n  padding: 1px 1px;\n  background-color: transparent;\n  background-image: none;\n  float: left;\n  vertical-align: middle;\n  text-align: center;\n  &:disabled {\n    opacity: 0.5;\n    background: transparent;\n    cursor: default;\n  }\n  &:hover {\n    border: solid 1px #99bbe8;\n    background: #ddefff;\n  }\n"])));
export var ToolbarButtonBase = function (props) {
    return (React.createElement(StyledButton, __assign({}, props), props.children));
};
var templateObject_1;
//# sourceMappingURL=ToolbarButtonBase.js.map