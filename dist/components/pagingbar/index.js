var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import first from './images/first.gif';
import last from './images/last.gif';
import next from './images/next.gif';
import prev from './images/prev.gif';
import refresh from './images/refresh.gif';
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  white-space: nowrap;\n"], ["\n  white-space: nowrap;\n"])));
var Item = styled.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font: 11px arial,tahoma,verdana,helvetica;\n  height: 100%;\n  padding: 1px 1px;\n  margin: 0 1px;\n  background-color: transparent;\n  background-image: none;\n  border: solid 1px transparent;\n  &:hover {\n    border: solid 1px #99BBE8;\n    background: #DDEFFF;\n  }\n"], ["\n  font: 11px arial,tahoma,verdana,helvetica;\n  height: 100%;\n  padding: 1px 1px;\n  margin: 0 1px;\n  background-color: transparent;\n  background-image: none;\n  border: solid 1px transparent;\n  &:hover {\n    border: solid 1px #99BBE8;\n    background: #DDEFFF;\n  }\n"])));
var Label = styled.label(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  height: 22px;\n  vertical-align: top;\n"], ["\n  display: inline-block;\n  height: 22px;\n  vertical-align: top;\n"])));
var NumberInput = styled.input.attrs({ type: 'number' })(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 60px;\n  margin: 0 5px;\n"], ["\n  width: 60px;\n  margin: 0 5px;\n"])));
export var PagingToolBar = function (_a) {
    var _b = _a.startPageNumber, startPageNumber = _b === void 0 ? 1 : _b, pageCount = _a.pageCount, onChange = _a.onChange;
    var _c = useState(pageCount), _pageCount = _c[0], setPageCount = _c[1];
    var _d = useState(startPageNumber), currentPage = _d[0], setCurrentPage = _d[1];
    useEffect(function () {
        setPageCount(pageCount);
    }, [pageCount]);
    var changeValue = function (page) {
        if (page && page >= 1 && page <= _pageCount && onChange) {
            setCurrentPage(page);
            onChange(page);
        }
    };
    var onInputChange = function (e) {
        var value = parseInt(e.target.value);
        setCurrentPage(value ? value : undefined);
    };
    var onKeyPressed = function (e) {
        if (e.key === "Enter") {
            if (currentPage && currentPage >= 1 && currentPage <= _pageCount && onChange) {
                onChange(currentPage);
            }
        }
    };
    return (React.createElement(Wrapper, null,
        React.createElement(Item, { onClick: function () {
                if (currentPage !== 1)
                    changeValue(1);
            } },
            React.createElement("img", { src: first, title: "\u041F\u0435\u0440\u0432\u0430\u044F", alt: "\u041F\u0435\u0440\u0432\u0430\u044F" })),
        React.createElement(Item, { onClick: function () { return currentPage && changeValue(currentPage - 1); } },
            React.createElement("img", { src: prev, title: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0448\u0430\u044F", alt: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0448\u0430\u044F" })),
        React.createElement(Label, null,
            "\u0421\u0442\u0440. ",
            React.createElement(NumberInput, { value: currentPage, onChange: onInputChange, onKeyUp: onKeyPressed, max: _pageCount, min: 1 }),
            " \u0438\u0437 ",
            _pageCount),
        React.createElement(Item, { onClick: function () { return currentPage && changeValue(currentPage + 1); } },
            React.createElement("img", { src: next, title: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F", alt: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F" })),
        React.createElement(Item, { onClick: function () {
                if (currentPage !== _pageCount)
                    changeValue(_pageCount);
            } },
            React.createElement("img", { src: last, title: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F", alt: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F" })),
        React.createElement(Item, { onClick: function () { return currentPage && onChange && onChange(currentPage); } },
            React.createElement("img", { src: refresh, title: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C", alt: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map