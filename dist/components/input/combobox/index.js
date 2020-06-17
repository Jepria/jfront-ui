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
import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import openIcon from './openIcon.gif';
import exclamation from '../images/exclamation.gif';
import loading from '../images/loading.gif';
import { isFunction } from '../../../utils';
var ComboBoxButton = styled.img(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n  border-color: #ccc;\n  border-top-color: #999;\n  border-bottom: 1px solid #b5b8c8;\n  height: 24px;\n"], ["\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n  border-color: #ccc;\n  border-top-color: #999;\n  border-bottom: 1px solid #b5b8c8;\n  height: 24px;\n"])));
var ComboBoxInput = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-sizing: border-box;\n  width: 100%;\n  white-space: nowrap;\n"], ["\n  box-sizing: border-box;\n  width: 100%;\n  white-space: nowrap;\n"])));
var Input = styled.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  height: 24px;\n  padding-left: 2px;\n  width: calc(100% - 17px);\n  ", "\n"], ["\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  height: 24px;\n  padding-left: 2px;\n  width: calc(100% - 17px);\n  ", "\n"])), function (props) { return props.error ? 'border: 1px solid red' : 'border: 1px solid #ccc; border-top: 1px solid #999;'; });
var ComboBoxOption = styled.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  overflow: hidden;\n  white-space: nowrap;\n  height: 18px;\n  padding: 2px 6px;\n  cursor: pointer;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  ", "\n  ", "\n"], ["\n  overflow: hidden;\n  white-space: nowrap;\n  height: 18px;\n  padding: 2px 6px;\n  cursor: pointer;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  ", "\n  ", "\n"])), function (props) { return props.hidden ? 'display: none' : ''; }, function (props) { return props.selected ? 'background: #ccddf3;' : '&:hover {background: #eee}'; });
var CompoBoxList = styled.ul(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: white;\n  overflow: auto;\n  margin: 0;\n  padding: 0;\n"], ["\n  background: white;\n  overflow: auto;\n  margin: 0;\n  padding: 0;\n"])));
var ComboBoxPopup = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  border-style: solid;\n  border-color: #99BBE8;\n  border-width: 1px;\n  z-index: 5100;\n  position: relative;\n"], ["\n  border-style: solid;\n  border-color: #99BBE8;\n  border-width: 1px;\n  z-index: 5100;\n  position: relative;\n"])));
var ComboBox = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var Image = styled.img(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  height: 16px;\n  width: 16px;\n  margin-top: 2px;\n  margin-left: 4px;\n"], ["\n  height: 16px;\n  width: 16px;\n  margin-top: 2px;\n  margin-left: 4px;\n"])));
var Container = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 24px;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"], ["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 24px;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"])), function (props) { return props.width ? "calc(" + props.width + " / 2)" : '100px'; }, function (props) { return props.width ? props.width : '200px'; });
var ComboBoxOptionComponent = function (_a) {
    var name = _a.name, value = _a.value, children = _a.children;
    var context = useContext(ComboBoxContext);
    useEffect(function () {
        if (value === context.selected && context.text !== name) {
            context.handleSelect(value, name);
        }
    });
    return (React.createElement(ComboBoxOption, { key: value, hidden: context.text && !context.selected ? !("" + name).startsWith(context.text) : false, selected: context.selected === value, onClick: function (e) {
            e.stopPropagation();
            context.handleSelect(value, name);
        } }, children ? children : name));
};
var ComboBoxListComponent = function (_a) {
    var children = _a.children;
    var context = useContext(ComboBoxContext);
    return (React.createElement(ComboBoxPopup, { hidden: !context.opened },
        React.createElement(CompoBoxList, null, isFunction(children) ? children() : children)));
};
var ComboBoxInputComponent = function (props) {
    var context = useContext(ComboBoxContext);
    var handleChange = function (e) {
        if (props.onChange) {
            props.onChange(e);
        }
        context.handleChange(e.target.value);
    };
    return (React.createElement(ComboBoxInput, null,
        React.createElement(Input, __assign({ type: 'text' }, props, { onChange: handleChange, onFocus: context.handleFocus, value: context.text, error: context.touched && context.error ? true : false })),
        React.createElement(ComboBoxButton, { src: openIcon, onClick: function (e) {
                e.stopPropagation();
                context.toggle();
            } })));
};
var ComboBoxContext = createContext({
    name: '',
    opened: false,
    isLoading: false,
    handleSelect: function (value, text) { },
    handleChange: function (value) { },
    toggle: function () { },
    handleFocus: function (e) { }
});
export var useComboBoxContext = function () {
    return useContext(ComboBoxContext);
};
var ComboBoxReducer = function (state, action) {
    switch (action.type) {
        case 'select':
            return { opened: false, selected: action.value, text: action.text };
        case 'filter':
            return { opened: true, selected: undefined, text: action.text };
        case 'toggle':
            return { opened: action.opened, selected: state.selected, text: state.text };
        case 'blur':
            return { opened: false, selected: state.selected, text: state.text };
        case 'focus':
            return { opened: action.opened, selected: state.selected, text: state.text };
    }
};
var ComboBoxComponent = function (_a) {
    var id = _a.id, width = _a.width, _b = _a.name, name = _b === void 0 ? '' : _b, value = _a.value, touched = _a.touched, error = _a.error, onChange = _a.onChange, isLoading = _a.isLoading, children = _a.children;
    var _c = useReducer(ComboBoxReducer, {
        opened: false,
        selected: [],
        text: ''
    }), _d = _c[0], opened = _d.opened, selected = _d.selected, text = _d.text, dispatch = _c[1];
    var _e = useState(isLoading), _isLoading = _e[0], setIsLoading = _e[1];
    useEffect(function () {
        setIsLoading(isLoading);
    }, [isLoading]);
    useEffect(function () {
        dispatch({
            type: 'select',
            value: value,
            text: ''
        });
    }, [value, dispatch]);
    var handleSelect = function (fieldValue, fieldText) {
        if (selected !== fieldValue || text !== fieldText) {
            dispatch({
                type: 'select',
                value: fieldValue,
                text: fieldText
            });
            if (onChange) {
                onChange(name, fieldValue);
            }
        }
    };
    var handleChange = function (value) {
        console.log(value);
        dispatch({
            type: 'filter',
            text: value
        });
    };
    var toggle = function () {
        dispatch({
            type: 'toggle',
            opened: !opened
        });
    };
    var handleFocus = function (e) {
        if (!opened) {
            dispatch({
                type: 'focus',
                opened: true
            });
        }
    };
    var handleBlur = function (e) {
        if (opened && e.relatedTarget === null) {
            dispatch({
                type: 'blur'
            });
        }
        if (onChange) {
            onChange(name, selected);
        }
    };
    return (React.createElement(ComboBoxContext.Provider, { value: { name: name, selected: selected, text: text, opened: opened, touched: touched, error: error, handleSelect: handleSelect, handleChange: handleChange, toggle: toggle, handleFocus: handleFocus, isLoading: _isLoading } },
        React.createElement(Container, { width: width },
            React.createElement(ComboBox, { id: id, tabIndex: 1, onBlur: handleBlur }, children),
            touched && error && React.createElement(Image, { src: exclamation, title: error }),
            !error && _isLoading && React.createElement(Image, { src: loading }))));
};
export { ComboBoxOptionComponent as ComboBoxOption, ComboBoxListComponent as ComboBoxList, ComboBoxInputComponent as ComboBoxInput, ComboBoxComponent as ComboBox };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=index.js.map