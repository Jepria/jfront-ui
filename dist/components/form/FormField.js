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
var StyledField = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  padding-top: 1px;\n  margin-bottom: 10px;\n"], ["\n  display: block;\n  padding-top: 1px;\n  margin-bottom: 10px;\n"])));
export var FormField = function (props) {
    return (React.createElement(StyledField, __assign({}, props), props.children));
};
var templateObject_1;
//# sourceMappingURL=FormField.js.map