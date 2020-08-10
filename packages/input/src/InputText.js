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
import React, { useState } from 'react';
export function InputText(props) {
    var _a = __read(useState((props.disabled && !props.readonly) || false), 2), active = _a[0], setActive = _a[1];
    var _b = __read(useState(props.value || ""), 2), value = _b[0], setValue = _b[1];
    var _c = __read(useState(props.error || ""), 2), error = _c[0], setError = _c[1];
    var _d = __read(useState(props.disabled || false), 2), disabled = _d[0], setDisabled = _d[1];
    var _e = __read(useState(props.readonly || false), 2), readonly = _e[0], setEditable = _e[1];
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