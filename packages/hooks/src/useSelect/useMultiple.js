var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { equals } from "./index";
export function useMultiple(instance) {
    instance.hooks.useInstance = instance.hooks.useInstance ? __spread(instance.hooks.useInstance, [useInstance]) : [useInstance];
}
function useInstance(instance) {
    var getSelectedOption = function () {
        var state = instance.state;
        if (state === null || state === void 0 ? void 0 : state.value) {
            return state.value;
        }
        else {
            return [];
        }
    };
    var mapArray = function (options) {
        var props = instance.props;
        return options.map(function (option) {
            if (props.getOptionValue) {
                return props.getOptionValue(option);
            }
            else {
                return option.value;
            }
        });
    };
    var getValue = function () {
        var state = instance.state, props = instance.props;
        if (state === null || state === void 0 ? void 0 : state.value) {
            return mapArray(state.value);
        }
        else {
            return [];
        }
    };
    var selectOption = function (value) {
        var dispatch = instance.dispatch, props = instance.props;
        if (Array.isArray(value)) {
            if (dispatch)
                dispatch({ type: 'select', value: __spread(value) });
            if (instance.props.onChange) {
                instance.props.onChange(mapArray(value));
            }
        }
        else if (value) {
            var newSelected = void 0;
            var optionValue = props.getOptionValue ? props.getOptionValue(value) : (value).value;
            var values = getValue();
            var options = getSelectedOption();
            if (values && values.includes(optionValue)) {
                newSelected = options.slice();
                newSelected.splice(values.indexOf(optionValue), 1);
            }
            else {
                if (options) {
                    newSelected = __spread(options, [value]);
                }
                else {
                    newSelected = [value];
                }
            }
            if (dispatch)
                dispatch({ type: 'select', value: newSelected });
            if (props.onChange) {
                props.onChange(newSelected.map(function (option) {
                    if (props.getOptionValue) {
                        return props.getOptionValue(option);
                    }
                    else {
                        return option.value;
                    }
                }));
            }
            else {
                if (dispatch)
                    dispatch({ type: 'select', value: [] });
                if (instance.props.onChange) {
                    instance.props.onChange([]);
                }
            }
        }
    };
    instance.selectOption = selectOption;
    instance.getSelectedValue = function () { return getValue(); };
    instance.getSelectedOption = function () { return getSelectedOption(); };
    instance.selectAll = function () { return selectOption(instance.props.options); };
    instance.isSelectedAll = function () {
        return equals(instance.props.options.map(function (option) { return instance.props.getOptionValue ? instance.props.getOptionValue(option) : option.value; }), getValue());
    };
}
//# sourceMappingURL=useMultiple.js.map