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
export var Table = styled.table(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  box-sizing: border-box;\n  border-collapse: collapse;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    border: 0;\n  }\n"], ["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  box-sizing: border-box;\n  border-collapse: collapse;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    border: 0;\n  }\n"])));
var TableContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  overflow-y: hidden;\n  overflow-x: hidden;\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n"], ["\n  width: 100%;\n  overflow-y: hidden;\n  overflow-x: hidden;\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n"])));
export var GridTable = function (props) {
    return (React.createElement(TableContainer, null,
        React.createElement(Table, __assign({}, props), props.children)));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=GridTable.js.map