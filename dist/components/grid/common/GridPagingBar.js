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
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PagingToolBar } from '../../pagingbar';
export var PagingBar = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font: 11px arial, tahoma, helvetica, sans-serif;\n  margin: 0;\n  padding: 2px 2px 2px 2px;\n  box-sizing: border-box;\n"], ["\n  font: 11px arial, tahoma, helvetica, sans-serif;\n  margin: 0;\n  padding: 2px 2px 2px 2px;\n  box-sizing: border-box;\n"])));
var Container = styled(PagingBar)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: table;\n  width: 100%;\n"], ["\n  display: table;\n  width: 100%;\n"])));
var Left = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: table-cell;\n  width: 33.33%;\n  text-align: left;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    width: auto;\n    display: table-row;\n    text-align: center;\n  }\n"], ["\n  display: table-cell;\n  width: 33.33%;\n  text-align: left;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    width: auto;\n    display: table-row;\n    text-align: center;\n  }\n"])));
var Center = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  width: 33.33%;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    width: auto;\n    display: table-row;\n    text-align: center;\n  }\n"], ["\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  width: 33.33%;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    width: auto;\n    display: table-row;\n    text-align: center;\n  }\n"])));
var Right = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: table-cell;\n  vertical-align: middle;\n  text-align: right;\n  width: 33.33%;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    width: auto;\n    display: table-row;\n    text-align: center;\n  }\n"], ["\n  display: table-cell;\n  vertical-align: middle;\n  text-align: right;\n  width: 33.33%;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    width: auto;\n    display: table-row;\n    text-align: center;\n  }\n"])));
var Input = styled.input.attrs({ type: 'number' })(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 60px;\n"], ["\n  width: 60px;\n"])));
export var GridPagingBar = function (props) {
    var _a = props.currentPage, currentPage = _a === void 0 ? 1 : _a, rowCount = props.rowCount, totalRowCount = props.totalRowCount, _b = props.visibleRowCount, visibleRowCount = _b === void 0 ? 25 : _b, onRefresh = props.onRefresh;
    var _c = useState(visibleRowCount), _visibleRowCount = _c[0], setVisibleRowCount = _c[1];
    var _d = useState(currentPage), _currentPage = _d[0], setCurrentPage = _d[1];
    var visibleRowCountInputRef = React.createRef();
    var pageCount = totalRowCount ? Math.ceil(totalRowCount / _visibleRowCount) : 1;
    var _e = useState(rowCount), _rowCount = _e[0], setRowCount = _e[1];
    var _f = useState(totalRowCount), _totalRowCount = _f[0], setTotalRowCount = _f[1];
    useEffect(function () {
        setTotalRowCount(totalRowCount);
    }, [totalRowCount]);
    useEffect(function () {
        setRowCount(rowCount);
    }, [rowCount]);
    var onChangeValues = function (pageNumber, pageSize) {
        if (pageNumber && pageSize && pageSize >= 1 && onRefresh) {
            onRefresh(pageNumber, pageSize);
        }
    };
    var onKeyUp = function (e) {
        var _a;
        if (e.key === "Enter") {
            var value = (_a = visibleRowCountInputRef.current) === null || _a === void 0 ? void 0 : _a.value;
            var intValue = void 0;
            if (value) {
                intValue = parseInt(value);
                if (intValue < 0) {
                    intValue = visibleRowCount;
                }
            }
            else {
                intValue = visibleRowCount;
            }
            if (visibleRowCountInputRef.current) {
                visibleRowCountInputRef.current.value = "" + intValue;
            }
            setVisibleRowCount(intValue);
            onChangeValues(_currentPage, intValue);
        }
    };
    var onBlur = function (e) {
        if (e.target.value && parseInt(e.target.value) > 0) {
            setVisibleRowCount(parseInt(e.target.value));
        }
    };
    return (React.createElement(Container, __assign({}, props),
        React.createElement(Left, null,
            React.createElement(PagingToolBar, { startPageNumber: currentPage, pageCount: pageCount, onChange: function (page) {
                    setCurrentPage(page);
                    onChangeValues(page, _visibleRowCount);
                } })),
        React.createElement(Center, null, _totalRowCount && _rowCount ? "\u0417\u0430\u043F\u0438\u0441\u0438 " + (_visibleRowCount * _currentPage - _visibleRowCount + 1) + " - " + (_rowCount < _visibleRowCount ? _rowCount : _visibleRowCount * _currentPage) + " \u0438\u0437 " + _totalRowCount :
            'Записей не найдено'),
        React.createElement(Right, null,
            React.createElement("label", null,
                "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435: ",
                React.createElement(Input, { ref: visibleRowCountInputRef, type: 'number', min: 1, max: _totalRowCount, defaultValue: _visibleRowCount, onBlur: onBlur, onKeyUp: onKeyUp })))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=GridPagingBar.js.map