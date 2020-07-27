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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import exclamation from '../images/exclamation.gif';
import loading from '../images/loading.gif';
import { useSelect } from '../../../hooks/useSelect';
import { useMultiple } from '../../../hooks/useSelect/useMultiple';
export var CheckBox = styled.input.attrs({ type: 'checkbox' })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 2px;\n"], ["\n  margin: 2px;\n"])));
export var CheckBoxListOptionLabel = styled.label(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 20px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  display: inline-block;\n  overflow: hidden;\n  cursor: pointer;\n  white-space: nowrap;\n  width: 100%;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n   -khtml-user-select: none; /* Konqueror HTML */\n     -moz-user-select: none; /* Old versions of Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n          user-select: none; /* Non-prefixed version, currently\n                                supported by Chrome, Edge, Opera and Firefox */\n"], ["\n  height: 20px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  display: inline-block;\n  overflow: hidden;\n  cursor: pointer;\n  white-space: nowrap;\n  width: 100%;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n   -khtml-user-select: none; /* Konqueror HTML */\n     -moz-user-select: none; /* Old versions of Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n          user-select: none; /* Non-prefixed version, currently\n                                supported by Chrome, Edge, Opera and Firefox */\n"])));
export var CheckBoxListOption = styled.li(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 20px;\n  width: 100%;\n  &:hover{\n    background: #eee\n  }\n"], ["\n  height: 20px;\n  width: 100%;\n  &:hover{\n    background: #eee\n  }\n"])));
export var OptionList = styled.ul(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  overflow: auto;\n  background: white;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: calc(100% - 20px);\n  ", "\n"], ["\n  overflow: auto;\n  background: white;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: calc(100% - 20px);\n  ", "\n"])), function (props) { return props.error ? 'border: 1px solid red;' : 'border: 1px solid #ccc; border-top: 1px solid #999;'; });
export var CheckBoxList = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  width: 100%;\n  height: ", ";\n"], ["\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  width: 100%;\n  height: ", ";\n"])), function (props) { return props.height ? props.height : '100px'; });
export var Icon = styled.img(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-left: 5px;\n  margin-top: 5px;\n  height: 16px;\n  width: 16px;\n"], ["\n  margin-left: 5px;\n  margin-top: 5px;\n  height: 16px;\n  width: 16px;\n"])));
export var ListContainer = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"], ["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"])), function (props) { return props.width ? "calc(" + props.width + " / 2)" : '100px'; }, function (props) { return props.width ? props.width : '200px'; });
/**
 * Check box list form field
 *
 * @param {CheckBoxListFieldProps} props incoming props
 * @example
 * const options = [
 *   {
 *     name: '123',
 *     value: '123'
 *   },
 *   {
 *     name: '111',
 *     value: '111'
 *   },
 *   {
 *     name: '222',
 *     value: '222'
 *   },
 *   {
 *     name: '333',
 *     value: '333'
 *   },
 *   {
 *     name: '444',
 *     value: '444'
 *   },
 * ]
 * <CheckBoxListField options={options} onChangeValue={(field: string, value: any) => {console.log(field, value)}}/>
 */
export var CheckBoxListField = function (_a) {
    var id = _a.id, _b = _a.name, name = _b === void 0 ? '' : _b, initialValue = _a.initialValue, options = _a.options, touched = _a.touched, error = _a.error, isLoading = _a.isLoading, onChangeValue = _a.onChangeValue, getOptionName = _a.getOptionName, getOptionValue = _a.getOptionValue, width = _a.width, height = _a.height;
    var _c = useState(isLoading), _isLoading = _c[0], setIsLoading = _c[1];
    useEffect(function () {
        setIsLoading(isLoading);
    }, [isLoading]);
    var _d = useSelect({
        options: options,
        onChange: function (value) {
            if (onChangeValue) {
                onChangeValue(name, value);
            }
        },
        initialValue: initialValue,
        getOptionName: getOptionName,
        getOptionValue: getOptionValue
    }, useMultiple), getSelectedValue = _d.getSelectedValue, isSelectedAll = _d.isSelectedAll, selectAll = _d.selectAll, selectOption = _d.selectOption, getOptions = _d.getOptions, getRootProps = _d.getRootProps, getListProps = _d.getListProps;
    var value = getSelectedValue();
    return (React.createElement(ListContainer, { width: width },
        React.createElement(CheckBoxList, __assign({ id: id, height: height }, getRootProps()),
            React.createElement(OptionList, __assign({ error: touched && error ? true : false }, getListProps()), getOptions().map(function (optionInstance) {
                return (React.createElement(CheckBoxOption, __assign({}, optionInstance.getOptionProps(), { option: optionInstance.option, selected: value && value.includes(optionInstance.option.value) })));
            })),
            React.createElement(SelectAllCheckBox, { selectAll: selectAll, selectOption: selectOption, isSelectedAll: isSelectedAll, disabled: !options || options.length == 0 })),
        touched && error && React.createElement(Icon, { src: exclamation, title: error }),
        !error && _isLoading && React.createElement(Icon, { src: loading })));
};
export var CheckBoxOption = function (props) {
    var role = props.role, selected = props.selected, option = props.option, getOptionName = props.getOptionName, onClick = props.onClick;
    return (React.createElement(CheckBoxListOption, { role: role, onDoubleClick: function (e) {
            /** IE fix checkbox double-click issue **/
            if (document.documentMode) {
                onClick();
            }
        } },
        React.createElement(CheckBoxListOptionLabel, null,
            React.createElement(CheckBox, { onChange: function (e) { return onClick(); }, checked: selected, onDoubleClick: function (e) {
                    /** IE fix checkbox double-click issue **/
                    if (document.documentMode) {
                        e.stopPropagation();
                        onClick();
                    }
                } }),
            getOptionName ? getOptionName(option) : option.name)));
};
export var SelectAllCheckBox = function (_a) {
    var disabled = _a.disabled, selectOption = _a.selectOption, selectAll = _a.selectAll, isSelectedAll = _a.isSelectedAll;
    var selectAllOptions = function () {
        if (isSelectedAll()) {
            selectOption([]);
        }
        else {
            selectAll();
        }
    };
    return (React.createElement(CheckBoxListOptionLabel, { onDoubleClick: function (e) {
            /** IE fix checkbox double-click issue **/
            if (document.documentMode) {
                selectAllOptions();
            }
        } },
        React.createElement(CheckBox, { onChange: function () {
                selectAllOptions();
            }, checked: isSelectedAll(), disabled: disabled, onDoubleClick: function (e) {
                /** IE fix checkbox double-click issue **/
                if (document.documentMode) {
                    e.stopPropagation();
                    selectAllOptions();
                }
            } }),
        "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0432\u0441\u0451"));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map