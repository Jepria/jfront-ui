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
import { loopPropGetters } from './index';
function reducer(state, action) {
    switch (action.type) {
        case 'filter':
            return __assign(__assign({}, state), { filter: action.filter });
        case 'select':
            return __assign(__assign({}, state), { filter: undefined });
    }
}
export function useFilter(instance) {
    instance.hooks.reducers = instance.hooks.reducers ? __spread(instance.hooks.reducers, [reducer]) : [reducer];
    instance.hooks.useInstance = instance.hooks.useInstance ? __spread(instance.hooks.useInstance, [useInstance]) : [useInstance];
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