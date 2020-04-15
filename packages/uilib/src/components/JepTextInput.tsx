import React, { useState } from 'react';

type JepTextInputProps = {
    id?: string,
    error?: string,
    value?: string,
    name: string,
    label?: string,
    disabled?: boolean,
    readonly?: boolean
};

export function JepTextInput(props: JepTextInputProps) {

    const [active, setActive] = useState((props.disabled && !props.readonly) || false);
    const [value, setValue] = useState(props.value || "");
    const [error, setError] = useState(props.error || "");
    const [disabled, setDisabled] = useState(props.disabled || false);
    const [readonly, setEditable] = useState(props.readonly || false);

    function changeValue(event) {
        const value = event.target.value;
        setValue(value);
        setError("");
    }
    const fieldClassName = `field ${active ? "active": ""}`;
    const labelClassName = `label ${error && "error"}`;
        return (
            <div className={fieldClassName}>
                <label htmlFor={props.id} className={labelClassName}>
                    {error || props.label}:
                </label>&nbsp;
                <input 
                    id={props.id} 
                    type={readonly ? "hidden" : "text"} 
                    name={props.name} 
                    disabled={disabled} 
                    onChange={changeValue.bind(this)} 
                    onFocus={() => !disabled && !readonly && setActive(true)} 
                    onBlur={() => !disabled && !readonly && setActive(false)} 
                />
                {readonly ? value : ""}
            </div>
        );
}

