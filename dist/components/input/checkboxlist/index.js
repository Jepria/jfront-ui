var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import exclamation from '../images/exclamation.gif';
import loading from '../images/loading.gif';
import { isFunction } from '../../../utils';
var CheckBox = styled.input.attrs({ type: 'checkbox' })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 2px;\n"], ["\n  margin: 2px;\n"])));
var CheckBoxListOptionLabel = styled.label(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 20px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  display: inline-block;\n  overflow: hidden;\n  cursor: pointer;\n  white-space: nowrap;\n  width: 100%;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n   -khtml-user-select: none; /* Konqueror HTML */\n     -moz-user-select: none; /* Old versions of Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n          user-select: none; /* Non-prefixed version, currently\n                                supported by Chrome, Edge, Opera and Firefox */\n"], ["\n  height: 20px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  display: inline-block;\n  overflow: hidden;\n  cursor: pointer;\n  white-space: nowrap;\n  width: 100%;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n   -khtml-user-select: none; /* Konqueror HTML */\n     -moz-user-select: none; /* Old versions of Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n          user-select: none; /* Non-prefixed version, currently\n                                supported by Chrome, Edge, Opera and Firefox */\n"])));
var CheckBoxListOptionSelected = styled.li(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 20px;\n  width: 100%;\n  background: #ccddf3;\n"], ["\n  height: 20px;\n  width: 100%;\n  background: #ccddf3;\n"])));
var CheckBoxListOption = styled.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 20px;\n  width: 100%;\n  &:hover{\n    background: #eee\n  }\n"], ["\n  height: 20px;\n  width: 100%;\n  &:hover{\n    background: #eee\n  }\n"])));
var CheckBoxListOptionList = styled.ul(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  overflow: auto;\n  background: white;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: calc(100% - 20px);\n  ", "\n"], ["\n  overflow: auto;\n  background: white;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: calc(100% - 20px);\n  ", "\n"])), function (props) { return props.error ? 'border: 1px solid red;' : 'border: 1px solid #ccc; border-top: 1px solid #999;'; });
var CheckBoxList = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  width: 100%;\n  height: ", ";\n"], ["\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  width: 100%;\n  height: ", ";\n"])), function (props) { return props.height ? props.height : '100px'; });
var Icon = styled.img(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin-left: 5px;\n  margin-top: 5px;\n  height: 16px;\n  width: 16px;\n"], ["\n  margin-left: 5px;\n  margin-top: 5px;\n  height: 16px;\n  width: 16px;\n"])));
var Container = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"], ["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"])), function (props) { return props.width ? "calc(" + props.width + " / 2)" : '100px'; }, function (props) { return props.width ? props.width : '200px'; });
var CheckBoxListReducer = function (state, action) {
    switch (action.type) {
        case 'select':
            return {
                values: state.values,
                selected: action.selected ? action.selected : []
            };
        case 'values':
            return {
                selected: state.selected,
                values: action.values
            };
    }
};
var CheckBoxListComponent = function (_a) {
    var id = _a.id, _b = _a.name, name = _b === void 0 ? '' : _b, value = _a.value, touched = _a.touched, error = _a.error, children = _a.children, isLoading = _a.isLoading, onChange = _a.onChange, width = _a.width, height = _a.height;
    var _c = useReducer(CheckBoxListReducer, {
        values: [],
        selected: []
    }), _d = _c[0], values = _d.values, selected = _d.selected, dispatch = _c[1];
    var _e = useState(isLoading), _isLoading = _e[0], setIsLoading = _e[1];
    useEffect(function () {
        setIsLoading(isLoading);
    }, [isLoading]);
    useEffect(function () {
        dispatch({
            type: 'select',
            selected: value ? value.slice() : []
        });
    }, [value, dispatch]);
    var changeSelection = function (value) {
        if (selected.includes(value)) {
            selected.splice(selected.indexOf(value), 1);
        }
        else {
            selected.push(value);
        }
        dispatch({
            type: 'select',
            selected: selected
        });
        if (onChange) {
            onChange(name, selected.slice());
        }
    };
    var selectAll = function () {
        if (values === selected || (values.length === selected.length && values.every(function (e) { return selected.includes(e); }))) {
            dispatch({
                type: 'select',
                selected: []
            });
            if (onChange) {
                onChange(name, []);
            }
        }
        else {
            dispatch({
                type: 'select',
                selected: values.slice()
            });
            if (onChange) {
                onChange(name, values.slice());
            }
        }
    };
    var addValue = function (value) {
        if (!values.includes(value)) {
            values.push(value);
        }
    };
    return (React.createElement(CheckBoxListContext.Provider, { value: { name: name, selected: selected, values: values, isLoading: _isLoading, touched: touched, error: error, changeSelection: changeSelection, selectAll: selectAll, addValue: addValue } },
        React.createElement(Container, { width: width },
            React.createElement(CheckBoxList, { id: id, height: height }, children),
            touched && error && React.createElement(Icon, { src: exclamation, title: error }),
            !error && _isLoading && React.createElement(Icon, { src: loading }))));
};
var OptionListComponent = function (_a) {
    var children = _a.children;
    var context = useContext(CheckBoxListContext);
    return (React.createElement(CheckBoxListOptionList, { error: context.touched && context.error ? true : false }, isFunction(children) ? children() : children));
};
var OptionComponent = function (_a) {
    var value = _a.value, name = _a.name, children = _a.children;
    var context = useContext(CheckBoxListContext);
    context.addValue(value);
    if (children) {
        if (context.selected.includes(value)) {
            return (React.createElement(CheckBoxListOptionSelected, { key: value, onClick: function (e) { return context.changeSelection(value); } }, children));
        }
        else {
            return (React.createElement(CheckBoxListOption, { key: value, onClick: function (e) { return context.changeSelection(value); } }, children));
        }
    }
    else {
        return (React.createElement(CheckBoxListOption, { key: value, onDoubleClick: function (e) {
                /** IE fix checkbox double-click issue **/
                if (document.documentMode) {
                    context.changeSelection(value);
                }
            } },
            React.createElement(CheckBoxListOptionLabel, null,
                React.createElement(CheckBox, { onChange: function (e) { return context.changeSelection(value); }, checked: context.selected.includes(value), onDoubleClick: function (e) {
                        /** IE fix checkbox double-click issue **/
                        if (document.documentMode) {
                            e.stopPropagation();
                            context.changeSelection(value);
                        }
                    } }),
                name)));
    }
};
var SelectAllCheckBoxComponent = function () {
    var _a;
    var context = useContext(CheckBoxListContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(CheckBoxListOptionLabel, { onDoubleClick: function (e) {
                /** IE fix checkbox double-click issue **/
                if (document.documentMode) {
                    context.selectAll();
                }
            } },
            React.createElement(CheckBox, { onChange: context.selectAll, checked: context.values === context.selected || (context.values.length === context.selected.length && context.values.every(function (e) { return context.selected.includes(e); })), disabled: ((_a = context.values) === null || _a === void 0 ? void 0 : _a.length) === 0, onDoubleClick: function (e) {
                    /** IE fix checkbox double-click issue **/
                    if (document.documentMode) {
                        e.stopPropagation();
                        context.selectAll();
                    }
                } }),
            "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0432\u0441\u0451")));
};
var CheckBoxListContext = createContext({
    name: '',
    isLoading: false,
    selected: [],
    values: [],
    changeSelection: function (value) { },
    selectAll: function () { },
    addValue: function (value) { }
});
export var useCheckBoxListContext = function () {
    return useContext(CheckBoxListContext);
};
export { CheckBoxListComponent as CheckBoxList, OptionListComponent as CheckBoxOptionList, OptionComponent as CheckBoxOption, SelectAllCheckBoxComponent as SelectAllCheckBox };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=index.js.map