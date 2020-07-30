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
export function InputSelect(props) {
    var list = [
        { id: "1", value: "Option1" },
        { id: "2", value: "Option2" },
        { id: "3", value: "Option3" }
    ]; // it could be func returning real data
    var _a = __read(useState(props.value || ""), 2), value = _a[0], setValue = _a[1];
    var _b = __read(useState(list), 2), data = _b[0], setData = _b[1];
    var _c = __read(useState(props.error || ""), 2), error = _c[0], setError = _c[1];
    var _d = __read(useState(props.disabled || false), 2), disabled = _d[0], setDisabled = _d[1];
    var _e = __read(useState(props.readonly || false), 2), readonly = _e[0], setEditable = _e[1];
    var handleChange = function (event) {
        alert(event.target.value);
        setValue(event.target.value);
    };
    var fieldClassName = ""; // make style depending on props and states
    var labelClassName = "label " + (error && "error");
    if (readonly) {
        return (React.createElement("div", { className: fieldClassName },
            React.createElement("label", { htmlFor: props.id, className: labelClassName },
                error || props.label,
                ":"),
            "\u00A0",
            value));
    }
    return (React.createElement("div", { className: fieldClassName },
        React.createElement("label", { htmlFor: props.id, className: labelClassName },
            error || props.label,
            ":"),
        "\u00A0",
        React.createElement("select", { id: props.id, name: props.name, value: value, disabled: disabled, onChange: handleChange.bind(this) }, data.map(function (item) { return (React.createElement("option", { key: item.id, value: item.value }, item.value)); }))));
}
//# sourceMappingURL=InputSelect.js.map