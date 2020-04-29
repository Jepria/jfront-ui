import React, { useState } from 'react';

type InputSelectProps = {
    id?: string,
    error?: string,
    label: string,
    name: string,
    value?: string,
    disabled?: boolean,
    readonly?: boolean
};

export function InputSelect(props: InputSelectProps) {
    const list = [
        { id: "1", value: "Option1"}, 
        { id: "2", value: "Option2"}, 
        { id: "3", value: "Option3"}
    ]; // it could be func returning real data

    const [value, setValue] = useState(props.value || "");
    const [data, setData] = useState(list);
    const [error, setError] = useState(props.error || "");
    const [disabled, setDisabled] = useState(props.disabled || false);
    const [readonly, setEditable] = useState(props.readonly || false);
    

    const handleChange = (event) => {
        alert(event.target.value);
        setValue(event.target.value);
    }
    const fieldClassName = ""; // make style depending on props and states
    const labelClassName = `label ${error && "error"}`;
    if(readonly) {
        return (
            <div className={fieldClassName}>
                <label htmlFor={props.id} className={labelClassName}>
                    {error || props.label}:
                </label>&nbsp;
                {value}
            </div>
        );
    }
    return (
        <div className={fieldClassName}>
            <label htmlFor={props.id} className={labelClassName}>
                    {error || props.label}:
            </label>&nbsp;
            <select 
                id={props.id} 
                name={props.name} 
                value={value} 
                disabled={disabled} 
                onChange={handleChange.bind(this)}>
                {data.map(item => (
                <option key={item.id} value={item.value}>{item.value}</option>
                ))}
            </select>
        </div>
    );
}