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
import { GridPagingBar } from './GridPagingBar';
import { GridBody } from './GridBody';
import { GridTable } from './GridTable';
import { GridHeader, GridHeaderCell } from './GridHeader';
import { TableRow, GridRow, GridCell } from './GridRow';
var Container = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: ", ";\n  width: ", ";\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n"], ["\n  height: ", ";\n  width: ", ";\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n"])), function (props) { return props.height ? props.height : '100%'; }, function (props) { return props.width ? props.width : '100%'; });
export var Grid = function (props) {
    return (React.createElement(Container, __assign({}, props), props.children));
};
Grid.Table = function (props) {
    return (React.createElement(GridTable, __assign({}, props), props.children));
};
Grid.Header = function (props) {
    return (React.createElement(GridHeader, __assign({}, props),
        React.createElement(TableRow, null, props.children)));
};
Grid.HeaderCell = function (props) {
    return (React.createElement(GridHeaderCell, __assign({}, props), props.children));
};
Grid.Body = function (_a) {
    var children = _a.children;
    return (React.createElement(GridBody, null, children));
};
Grid.Row = function (props) {
    return (React.createElement(GridRow, __assign({}, props), props.children));
};
Grid.Cell = function (props) {
    return (React.createElement(GridCell, __assign({}, props), props.children));
};
Grid.PagingBar = function (props) {
    return (React.createElement(GridPagingBar, __assign({}, props)));
};
var templateObject_1;
//# sourceMappingURL=index.js.map