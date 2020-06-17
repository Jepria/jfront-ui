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
import React from 'react';
import styled from 'styled-components';
export var TableRow = styled.tr(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: block;\n  }\n"], ["\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: block;\n  }\n"])));
export var TableCell = styled.td(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  @media only screen and (min-width: 761px) {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    ", "\n  }\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: block;\n    &::before {    \n      display: inline-block;\n      content: \"", "\";\n    }\n  }\n"], ["\n  @media only screen and (min-width: 761px) {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    ", "\n  }\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: block;\n    &::before {    \n      display: inline-block;\n      content: \"", "\";\n    }\n  }\n"])), function (props) { return props.width ? "width: " + props.width + ";" : ''; }, function (props) { return props.label ? props.label + ":" : ''; });
export var GridRow = function (props) {
    return (React.createElement(TableRow, __assign({}, props), typeof props.children === 'function' ? props.children() : props.children));
};
export var GridCell = function (props) {
    return (React.createElement(TableCell, __assign({}, props), typeof props.children === 'function' ? props.children() : props.children));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=GridRow.js.map