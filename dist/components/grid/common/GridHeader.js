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
import styled from 'styled-components';
import React from 'react';
export var TableHeader = styled.thead(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  overflow-y: hidden;\n  overflow-x: hidden;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: none; \n  }\n"], ["\n  display: block;\n  overflow-y: hidden;\n  overflow-x: hidden;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: none; \n  }\n"])));
export var TableHeaderCell = styled.th(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-overflow: ellipsis;\n  white-space: normal;\n  overflow: hidden;\n  ", "\n"], ["\n  text-overflow: ellipsis;\n  white-space: normal;\n  overflow: hidden;\n  ", "\n"])), function (props) { return props.width ? "width: " + props.width + ";" : ''; });
export var GridHeader = function (props) {
    return (React.createElement(TableHeader, __assign({}, props), props.children));
};
export var GridHeaderCell = function (props) {
    return (React.createElement(TableHeaderCell, __assign({}, props), props.children));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=GridHeader.js.map