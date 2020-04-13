import React from "react";
import { Hello } from "../src/components/Hello";
import { JepTextInput } from "../src/components/JepTextInput";
import { JepCombobox } from "../src/components/JepCombobox";

export default {
  title: 'Hello'
};

export const zero = () => <Hello name={'Alexander'} />;
export const one = () => <Hello name={'Anna'} />;
zero.story = {
  name: 'Alexander',
};
one.story = {
  name: 'Anna',
};

export function Inputs() {
  return (
    <div>
      <JepTextInput id="1" label="First" name="1"/><br/>
      <JepTextInput id="2" label="Second" name="2"/><br/>
      <JepTextInput id="3" label="Not editable" name="third" readonly={true} value="value" /><br/>
      <JepTextInput id="4" label="Disabled" name="forth" disabled={true} />
    </div>
  );
}

export function Dropdown() {
  return (
    <div>
      <JepCombobox label="Первый"/><br/>
    </div>
  );
}