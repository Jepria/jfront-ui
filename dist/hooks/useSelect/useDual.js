var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function useDual(instance) {
    instance.hooks.useInstance = instance.hooks.useInstance ? __spreadArrays(instance.hooks.useInstance, [useInstance]) : [useInstance];
}
function useInstance(instance) {
    var getOptions = instance.getOptions;
    instance.getOptions = function () {
        var getSelectedValue = instance.getSelectedValue, props = instance.props;
        var selectedValue = getSelectedValue();
        if (selectedValue && Array.isArray(selectedValue)) {
            return getOptions().filter(function (optionInstance) { return !selectedValue.includes(props.getOptionValue ? props.getOptionValue(optionInstance.option) : optionInstance.option.value); });
        }
        else {
            return getOptions();
        }
    };
    instance.getSelectedOptions = function () {
        var getSelectedValue = instance.getSelectedValue, props = instance.props;
        var selectedValue = getSelectedValue();
        if (selectedValue && Array.isArray(selectedValue)) {
            return props.options.filter(function (option) { return selectedValue.includes(props.getOptionValue ? props.getOptionValue(option) : option.value); }).map(function (option) {
                return {
                    option: option,
                    getOptionProps: function () { return ({
                        key: "" + (props.getOptionValue ? props.getOptionValue(option) : (option).value),
                        role: 'option',
                        onClick: function () {
                            instance.selectOption(option);
                        }
                    }); }
                };
            });
        }
        else {
            return [];
        }
    };
}
//# sourceMappingURL=useDual.js.map