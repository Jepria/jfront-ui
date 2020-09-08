import * as React from "react"
import { CheckBoxGroup } from "../src"
import { CheckBox } from "@jfront/ui-checkbox"
import { useState, useEffect } from "react"

export default {
  title: "CheckBoxGroup",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [values, setValues] = useState<string[]>()

  return (
    <div>
      <CheckBoxGroup
        name="name"
        text="Group"
        isLoading={false}
        disabled={false}
        values={values ? values : []}
        onChange={(name, _values) => {
          setValues(_values)
        }}
      >
        <CheckBox label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
      </CheckBoxGroup>
    </div>
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
        values={["asd", "as2"]}
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
        values={["asd", "as2"]}
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
        values={["asd", "as2"]}
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
        values={["asd", "as2"]}
        error="Wrong value"
      >
        <CheckBox label="label1" value="value" />
        <CheckBox label="label2" value="value" />
      </CheckBoxGroup>
    </>
  )
}
