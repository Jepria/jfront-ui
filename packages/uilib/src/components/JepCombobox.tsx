import React, { useState } from 'react';

type JepComboboxProps = {
    label: string,
    value?: string
};

export function JepCombobox(props: JepComboboxProps) {
    const list = [
        { id: "1", value: "Option1"}, 
        { id: "2", value: "Option2"}, 
        { id: "3", value: "Option3"}
    ]; // it could be func returning real data

    const [value, setValue] = useState(props.value || "");
    const [data, setData] = useState(list);

    const fieldClassName = ""; // make style depending on props and states

    const handleChange = (event) => {
        alert(event.target.value);
        setValue(event.target.value);
    }

    return (
        <div className={fieldClassName}>
            <label>{props.label}</label><br/>
            <select value={value} onChange={handleChange.bind(this)}>
                {data.map(item => (
                <option key={item.id} value={item.value}>{item.value}</option>
                ))}
            </select>
        </div>
    );
}