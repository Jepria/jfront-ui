import * as React from "react"
import { CheckBoxGroup } from "../src"
import { CheckBox } from "@jfront/ui-checkbox"

export default {
  title: "CheckBoxGroup",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <CheckBoxGroup
        name="name"
        text="Group"
        isLoading={false}
        disabled={false}
        value={["asd", "as2"]}
      >
        <CheckBox label="label1" value="value" />
        {/*<CheckBox label="label2" value="value"/>*/}
      </CheckBoxGroup>
    </>
  )
}

export const Disabled = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <CheckBoxGroup
        name="name"
        text="Group"
        isLoading={false}
        value={["asd", "as2"]}
      >
        <CheckBox disabled={true} label="label1" value="value" />
        <CheckBox label="label2" value="value" />
        <CheckBox label="label3" value="value" />
      </CheckBoxGroup>
      <CheckBoxGroup
        name="name2"
        text="DisabledGroup"
        isLoading={false}
        disabled={true}
        value={["asd", "as2"]}
      >
        <CheckBox label="label1" value="value" />
        <CheckBox label="label2" value="value" />
        <CheckBox label="label3" value="value" />
      </CheckBoxGroup>
    </>
  )
}

export const Loading = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <CheckBoxGroup
        name="name"
        text="Group"
        disabled={false}
        value={["asd", "as2"]}
        isLoading
      >
        <CheckBox label="label1" value="value" />
        <CheckBox label="label2" value="value" />
      </CheckBoxGroup>
    </>
  )
}

export const Error = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <CheckBoxGroup
        name="name"
        text="Group"
        disabled={false}
        value={["asd", "as2"]}
        error="Wrong value"
      >
        <CheckBox label="label1" value="value" />
        <CheckBox label="label2" value="value" />
      </CheckBoxGroup>
    </>
  )
}
