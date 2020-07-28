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
import { loopPropGetters } from '.';
function reducer(state, action) {
    switch (action.type) {
        case 'filter':
            return __assign(__assign({}, state), { filter: action.filter });
        case 'select':
            return __assign(__assign({}, state), { filter: undefined });
    }
}
export function useFilter(instance) {
    instance.hooks.reducers = instance.hooks.reducers ? __spreadArrays(instance.hooks.reducers, [reducer]) : [reducer];
    instance.hooks.useInstance = instance.hooks.useInstance ? __spreadArrays(instance.hooks.useInstance, [useInstance]) : [useInstance];
}
function useInstance(instance) {
    var getOptions = instance.getOptions;
    instance.getInputProps = function () {
        var hooks = instance.hooks, props = instance.props, selectOption = instance.selectOption, dispatch = instance.dispatch;
        var inputProps = hooks.getInputProps ? loopPropGetters(instance.hooks.getInputProps) : {};
        return __assign({ 'aria-autocomplete': 'list', autoComplete: 'off', onChange: function (e) {
                if (props.invalidateOnFilter) {
                    selectOption(undefined);
                }
                if (dispatch) {
                    dispatch({
                        type: 'filter',
                        filter: e.target.value
                    });
                }
            } }, inputProps);
    };
    instance.getOptions = function () {
        var state = instance.state, props = instance.props;
        if (state.filter) {
            return getOptions().filter(function (optionInstance) { return props.getOptionName ?
                props.getOptionName(optionInstance.option) : optionInstance.option.name.startsWith(state.filter); });
        }
        else {
            return getOptions();
        }
    };
}
//# sourceMappingURL=useFilter.js.map