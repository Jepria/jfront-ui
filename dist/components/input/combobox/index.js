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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import openIcon from './openIcon.gif';
import exclamation from '../images/exclamation.gif';
import loading from '../images/loading.gif';
import { useSelect } from '../../../hooks/useSelect';
import { useDropdown } from '../../../hooks/useSelect/useDropdown';
import { useFilter } from '../../../hooks/useSelect/useFilter';
export var ComboBoxInputContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  width: 100%;\n  white-space: nowrap;\n"], ["\n  box-sizing: border-box;\n  width: 100%;\n  white-space: nowrap;\n"])));
export var ComboBoxButton = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n  border-color: #ccc;\n  border-top-color: #999;\n  border-bottom: 1px solid #b5b8c8;\n  height: 24px;\n"], ["\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n  border-color: #ccc;\n  border-top-color: #999;\n  border-bottom: 1px solid #b5b8c8;\n  height: 24px;\n"])));
export var ComboBoxInput = styled.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  height: 24px;\n  padding-left: 2px;\n  width: calc(100% - 17px);\n  ", "\n"], ["\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  height: 24px;\n  padding-left: 2px;\n  width: calc(100% - 17px);\n  ", "\n"])), function (props) { return props.error ? 'border: 1px solid red' : 'border: 1px solid #ccc; border-top: 1px solid #999;'; });
export var ComboBoxOption = styled.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  overflow: hidden;\n  white-space: nowrap;\n  height: 18px;\n  padding: 2px 6px;\n  cursor: pointer;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  ", "\n"], ["\n  overflow: hidden;\n  white-space: nowrap;\n  height: 18px;\n  padding: 2px 6px;\n  cursor: pointer;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  font-size: 12px;\n  ", "\n"])), function (props) { return props.selected ? 'background: #ccddf3;' : '&:hover {background: #eee}'; });
export var ComboBoxList = styled.ul(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: white;\n  overflow: auto;\n  margin: 0;\n  padding: 0;\n  border-style: solid;\n  border-color: #99BBE8;\n  border-width: 1px;\n  z-index: 5100;\n  position: relative;\n"], ["\n  background: white;\n  overflow: auto;\n  margin: 0;\n  padding: 0;\n  border-style: solid;\n  border-color: #99BBE8;\n  border-width: 1px;\n  z-index: 5100;\n  position: relative;\n"])));
var ComboBox = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var Image = styled.img(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 16px;\n  width: 16px;\n  margin-top: 2px;\n  margin-left: 4px;\n"], ["\n  height: 16px;\n  width: 16px;\n  margin-top: 2px;\n  margin-left: 4px;\n"])));
export var Container = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 24px;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"], ["\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 24px;\n  min-width: ", ";\n  max-width: ", ";\n  width: 100%;\n"])), function (props) { return props.width ? "calc(" + props.width + " / 2)" : '100px'; }, function (props) { return props.width ? props.width : '200px'; });
/**
 * ComboBox form field
 *
 * @param {ComboBoxFieldProps} props incoming props
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
 * <ComboBoxField options={options} onChangeValue={(field: string, value: any) => console.log(field, value)}/>
 */
export var ComboBoxField = function (_a) {
    var id = _a.id, width = _a.width, _b = _a.name, name = _b === void 0 ? '' : _b, initialValue = _a.initialValue, hasEmptyOption = _a.hasEmptyOption, _c = _a.emptyOptionText, emptyOptionText = _c === void 0 ? '' : _c, touched = _a.touched, error = _a.error, placeholder = _a.placeholder, inputValue = _a.inputValue, disabled = _a.disabled, onChange = _a.onChange, onChangeValue = _a.onChangeValue, isLoading = _a.isLoading, options = _a.options, getOptionName = _a.getOptionName, getOptionValue = _a.getOptionValue;
    var _d = useSelect({
        options: hasEmptyOption ? __spreadArrays([{ name: emptyOptionText, value: undefined }], options) : options,
        onChange: function (value) {
            if (onChangeValue) {
                onChangeValue(name, value);
            }
        },
        initialValue: initialValue,
        getOptionName: getOptionName,
        getOptionValue: getOptionValue,
        invalidateOnFilter: true
    }, useDropdown, useFilter), isOpen = _d.isOpen, selectOption = _d.selectOption, getSelectedValue = _d.getSelectedValue, getSelectedOption = _d.getSelectedOption, getOptions = _d.getOptions, getButtonProps = _d.getButtonProps, getRootProps = _d.getRootProps, getListProps = _d.getListProps, getInputProps = _d.getInputProps;
    var _e = useState(isLoading), _isLoading = _e[0], setIsLoading = _e[1];
    useEffect(function () {
        setIsLoading(isLoading);
    }, [isLoading]);
    var selectedValue = getSelectedValue();
    var selectedOption = getSelectedOption();
    return (React.createElement(Container, { width: width },
        React.createElement(ComboBox, __assign({}, getRootProps(), { id: id }),
            React.createElement(ComboBoxInputContainer, null,
                React.createElement(ComboBoxInput, __assign({}, getInputProps(), { onChange: function (e) {
                        if (onChange) {
                            selectOption(undefined);
                            onChange(e);
                        }
                        else {
                            getInputProps().onChange;
                        }
                    }, error: touched && error ? true : false, placeholder: placeholder, disabled: disabled, value: selectedOption ? (getOptionName ? getOptionName(selectedOption) : selectedOption.name) : (onChange ? inputValue : getInputProps().value) })),
                React.createElement(ComboBoxButton, __assign({}, getButtonProps(), { src: openIcon }))),
            React.createElement(ComboBoxList, __assign({}, getListProps(), { style: isOpen ? { display: 'block' } : { display: 'none' } }), getOptions().map(function (optionInstance) {
                return (React.createElement(ComboBoxOption, __assign({}, optionInstance.getOptionProps(), { selected: selectedValue === (optionInstance.option.value && getOptionValue ? getOptionValue(optionInstance.option) : optionInstance.option.value) }), optionInstance.option.value && getOptionName ? getOptionName(optionInstance.option) : optionInstance.option.name));
            }))),
        touched && error && React.createElement(Image, { src: exclamation, title: error }),
        !error && _isLoading && React.createElement(Image, { src: loading })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=index.js.map