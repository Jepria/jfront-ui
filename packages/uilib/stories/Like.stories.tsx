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
      <JepTextInput id="t1" label="First" name="1"/><br/>
      <JepTextInput id="t2" label="Second" name="2"/><br/>
      <JepTextInput id="t3" label="Not editable" name="third" readonly={true} value="value" /><br/>
      <JepTextInput id="t4" label="Disabled" name="forth" disabled={true} />
    </div>
  );
}

export function Dropdown() {
  return (
    <div>
      <JepCombobox id="c1" label="First" name="first"/><br/>
      <JepCombobox id="c2" label="Not editable" name="second" readonly={true} value="Option1"/><br/>
      <JepCombobox id="c3" label="Disabled" name="first" disabled={true}/><br/>
    </div>
  );
}