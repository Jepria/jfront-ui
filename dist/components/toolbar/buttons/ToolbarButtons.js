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
import btn_add from "./icons/add.png";
import btn_save from "./icons/save.png";
import btn_edit from "./icons/edit.png";
import btn_find from "./icons/search.png";
import btn_delete from "./icons/delete.png";
import btn_view from "./icons/view.png";
import split from "./icons/split.gif";
import { ToolbarButtonBase } from "./ToolbarButtonBase";
import styled from "styled-components";
var ToolbarButtonFind = function (props) {
    return (React.createElement(ToolbarButtonBase, __assign({}, props),
        React.createElement("img", { src: btn_find })));
};
var ToolbarButtonCreate = function (props) {
    return (React.createElement(ToolbarButtonBase, __assign({}, props),
        React.createElement("img", { src: btn_add })));
};
var ToolbarButtonSave = function (props) {
    return (React.createElement(ToolbarButtonBase, __assign({}, props),
        React.createElement("img", { src: btn_save })));
};
var ToolbarButtonEdit = function (props) {
    return (React.createElement(ToolbarButtonBase, __assign({}, props),
        React.createElement("img", { src: btn_edit })));
};
var ToolbarButtonDelete = function (props) {
    return (React.createElement(ToolbarButtonBase, __assign({}, props),
        React.createElement("img", { src: btn_delete })));
};
var ToolbarButtonView = function (props) {
    return (React.createElement(ToolbarButtonBase, __assign({}, props),
        React.createElement("img", { src: btn_view })));
};
var ToolbarSplitter = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  background-position: center;\n  background-repeat: repeat;\n  height: 22px;\n  width: 2px;\n  float: left;\n  margin-left: 2px;\n  margin-right: 2px;\n  background-image: url(", ");\n"], ["\n  display: inline-block;\n  background-position: center;\n  background-repeat: repeat;\n  height: 22px;\n  width: 2px;\n  float: left;\n  margin-left: 2px;\n  margin-right: 2px;\n  background-image: url(", ");\n"])), split);
export { ToolbarButtonFind, ToolbarButtonCreate, ToolbarButtonSave, ToolbarButtonEdit, ToolbarButtonDelete, ToolbarButtonView, ToolbarSplitter, };
var templateObject_1;
//# sourceMappingURL=ToolbarButtons.js.map