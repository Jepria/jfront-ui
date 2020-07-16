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
function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return __assign(__assign({}, state), { isOpen: true });
        case 'close':
            return __assign(__assign({}, state), { isOpen: false });
        case 'toggle':
            return __assign(__assign({}, state), { isOpen: state.isOpen ? false : true });
    }
}
export function useDropdown(instance) {
    instance.hooks.reducers = instance.hooks.reducers ? __spreadArrays(instance.hooks.reducers, [reducer]) : [reducer];
    instance.hooks.useInstance = instance.hooks.useInstance ? __spreadArrays(instance.hooks.useInstance, [useInstance]) : [useInstance];
}
function useInstance(instance) {
    var toggle = function () {
        if (instance.dispatch) {
            instance.dispatch({
                type: 'toggle'
            });
        }
        instance.isOpen = !instance.state.isOpen;
    };
    instance.open = function () {
        if (instance.dispatch) {
            instance.dispatch({
                type: 'open'
            });
        }
        instance.isOpen = true;
    };
    instance.close = function () {
        if (instance.dispatch) {
            instance.dispatch({
                type: 'close'
            });
        }
        instance.isOpen = false;
    };
    var getOptions = instance.getOptions;
    instance.getOptions = function () {
        var props = instance.props, close = instance.close;
        return getOptions().map(function (optionInstance) {
            var optionProps = optionInstance.getOptionProps();
            optionInstance.getOptionProps = function () {
                var option = optionInstance.option;
                return {
                    key: "" + (props.getOptionValue ? props.getOptionValue(option) : option.value),
                    role: 'option',
                    onClick: function () {
                        if (props.closeOnSelect) {
                            optionProps.onClick();
                            close();
                        }
                        else {
                            optionProps.onClick();
                        }
                    }
                };
            };
            return optionInstance;
        });
    };
    instance.getButtonProps = function () { return ({
        onClick: function () {
            toggle();
        }
    }); };
    ;
    var getRootProps = function () {
        var state = instance.state, close = instance.close;
        return {
            tabIndex: 1,
            onBlur: function (_a) {
                var _b;
                var relatedTarget = _a.relatedTarget, currentTarget = _a.currentTarget;
                if (!state.isOpen)
                    return;
                if (relatedTarget === null) {
                    close();
                    return;
                }
                var node = (_b = relatedTarget) === null || _b === void 0 ? void 0 : _b.parentNode;
                while (node !== null) {
                    if (node === currentTarget)
                        return;
                    node = node === null || node === void 0 ? void 0 : node.parentNode;
                }
                close();
            }
        };
    };
    if (instance.hooks.getRootProps) {
        instance.hooks.getRootProps.push(getRootProps);
    }
    else {
        instance.hooks.getRootProps = [getRootProps];
    }
    var getInputProps = function () {
        var props = instance.props, state = instance.state, open = instance.open;
        var name;
        if ((state === null || state === void 0 ? void 0 : state.value) && !Array.isArray(state.value)) {
            name = props.getOptionName ? props.getOptionName(state.value) : state.value.name;
        }
        else {
            name = state.filter ? state.filter : '';
        }
        return {
            value: name,
            onFocus: function () {
                open();
            }
        };
    };
    if (instance.hooks.getInputProps) {
        instance.hooks.getInputProps.push(getInputProps);
    }
    else {
        instance.hooks.getInputProps = [getInputProps];
    }
}
//# sourceMappingURL=useDropdown.js.map