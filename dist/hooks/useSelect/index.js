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
import React, { useRef, useReducer, useEffect } from 'react';
export function useGetLatest(obj) {
    var ref = React.useRef(obj);
    return React.useCallback(function () { return ref.current; }, []);
}
export function equals(arr1, arr2) {
    var i = arr1.length;
    if (i != arr2.length)
        return false;
    while (i--) {
        if (!arr2.includes(arr1[i]) || (arr2.includes(arr1[i]) && arr2.filter(function (elem) { return elem === arr1[i]; }).length > 1)) {
            return false;
        }
    }
    return true;
}
export function checkValueCollision(options, getOptionValue) {
    var values = options.map(function (option) {
        option.value && getOptionValue ? getOptionValue(option) : option.value;
    });
    var duplicates = values.reduce(function (acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0)
            acc.push(el);
        return acc;
    }, []);
    if (duplicates.length > 0) {
        throw new Error('Duplicate values not allowed');
    }
}
export function loopPropGetters(propGetters) {
    var result = {};
    propGetters.forEach(function (propGetter) {
        result = __assign(__assign({}, result), propGetter());
    });
    return result;
}
function useSelectReducer(state, action) {
    switch (action.type) {
        case 'select':
            return __assign(__assign({}, state), { value: action.value });
        case 'init':
            return { value: action.initialValue };
    }
}
var defaultProps = {
    initialValue: undefined,
    options: [],
    closeOnSelect: true
};
export function useSelect(props) {
    var hooks = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        hooks[_i - 1] = arguments[_i];
    }
    var initialValue = props.initialValue, getOptionValue = props.getOptionValue, onChange = props.onChange;
    var instanceRef = useRef({
        props: __assign(__assign({}, defaultProps), props),
        hooks: hooks,
        getOptions: function () {
            return getInstance().props.options.map(function (option) {
                return {
                    option: option,
                    getOptionProps: function () { return ({
                        key: "" + (getOptionValue ? getOptionValue(option) : (option).value),
                        role: 'option',
                        onClick: function () {
                            getInstance().selectOption(option);
                        }
                    }); }
                };
            });
        },
        selectOption: function (option) {
            if (option) {
                var currentValue = state.value ? (getOptionValue ? getOptionValue(state.value) : state.value.value) : undefined;
                var optionValue = getOptionValue ? getOptionValue(option) : (option).value;
                if (currentValue === optionValue) {
                    return;
                }
                dispatch({ type: 'select', value: option });
                if (onChange) {
                    onChange(optionValue);
                }
            }
            else {
                dispatch({ type: 'select', value: undefined });
            }
        },
        getRootProps: function () {
            var rootProps = getInstance().hooks.getRootProps ? loopPropGetters(getInstance().hooks.getRootProps) : {};
            return __assign({ role: 'combobox' }, rootProps);
        },
        getListProps: function () {
            var listProps = getInstance().hooks.getListProps ? loopPropGetters(getInstance().hooks.getListProps) : {};
            return __assign({ role: 'listbox' }, listProps);
        },
        getSelectedValue: function () {
            var _a, _b, _c;
            return ((_a = getInstance().state) === null || _a === void 0 ? void 0 : _a.value) ? (getOptionValue ? getOptionValue((_b = getInstance().state) === null || _b === void 0 ? void 0 : _b.value) : (_c = getInstance().state) === null || _c === void 0 ? void 0 : _c.value.value) : undefined;
        },
        getSelectedOption: function () { var _a; return (_a = getInstance().state) === null || _a === void 0 ? void 0 : _a.value; }
    });
    var getInstance = useGetLatest(instanceRef.current);
    Object.assign(getInstance(), {
        props: __assign(__assign({}, defaultProps), props)
    });
    //allow hooks to register itselfs ASAP
    instanceRef.current.hooks.forEach(function (hook) { return hook(instanceRef.current); });
    var reducer = function (state, action) {
        if (!action.type) {
            throw new Error('Invalid Action');
        }
        return __spreadArrays([
            useSelectReducer
        ], getInstance().hooks.reducers ? getInstance().hooks.reducers : []).reduce(function (s, handler) { return handler(s, action, state, getInstance()) || s; }, state);
    };
    var _a = useReducer(reducer, { value: initialValue }), state = _a[0], dispatch = _a[1];
    useEffect(function () {
        var _a;
        if (state.value && initialValue && Array.isArray(initialValue) && !equals(state.value, initialValue)) {
            dispatch({ type: 'init', initialValue: initialValue });
        }
        else {
            if (state.value !== initialValue
                && (getOptionValue ? getOptionValue(state.value) !== getOptionValue(initialValue) : ((_a = state.value) === null || _a === void 0 ? void 0 : _a.value) !== (initialValue === null || initialValue === void 0 ? void 0 : initialValue.value))) {
                dispatch({ type: 'init', initialValue: initialValue });
            }
        }
    }, [initialValue]);
    Object.assign(getInstance(), { state: state, dispatch: dispatch });
    //allow hooks to update the final state of useSelect instance
    if (hooks.useInstance) {
        instanceRef.current.hooks.useInstance.forEach(function (hook) { return hook(getInstance()); });
    }
    return getInstance();
}
//# sourceMappingURL=index.js.map