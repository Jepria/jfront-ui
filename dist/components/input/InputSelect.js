import React, { useState } from 'react';
export function InputSelect(props) {
    var list = [
        { id: "1", value: "Option1" },
        { id: "2", value: "Option2" },
        { id: "3", value: "Option3" }
    ]; // it could be func returning real data
    var _a = useState(props.value || ""), value = _a[0], setValue = _a[1];
    var _b = useState(list), data = _b[0], setData = _b[1];
    var _c = useState(props.error || ""), error = _c[0], setError = _c[1];
    var _d = useState(props.disabled || false), disabled = _d[0], setDisabled = _d[1];
    var _e = useState(props.readonly || false), readonly = _e[0], setEditable = _e[1];
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