import React, { useState } from 'react';
export function InputText(props) {
    var _a = useState((props.disabled && !props.readonly) || false), active = _a[0], setActive = _a[1];
    var _b = useState(props.value || ""), value = _b[0], setValue = _b[1];
    var _c = useState(props.error || ""), error = _c[0], setError = _c[1];
    var _d = useState(props.disabled || false), disabled = _d[0], setDisabled = _d[1];
    var _e = useState(props.readonly || false), readonly = _e[0], setEditable = _e[1];
    function changeValue(event) {
        var value = event.target.value;
        setValue(value);
        setError("");
    }
    var fieldClassName = "field " + (active ? "active" : "");
    var labelClassName = "label " + (error && "error");
    return (React.createElement("div", { className: fieldClassName },
        React.createElement("label", { htmlFor: props.id, className: labelClassName },
            error || props.label,
            ":"),
        "\u00A0",
        React.createElement("input", { id: props.id, type: readonly ? "hidden" : "text", name: props.name, disabled: disabled, onChange: changeValue.bind(this), onFocus: function () { return !disabled && !readonly && setActive(true); }, onBlur: function () { return !disabled && !readonly && setActive(false); } }),
        readonly ? value : ""));
}
//# sourceMappingURL=InputText.js.map