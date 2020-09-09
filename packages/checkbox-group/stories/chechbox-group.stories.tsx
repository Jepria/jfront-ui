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
      <CheckBoxGroup name="name" text="Group" isLoading={false}>
        <CheckBox disabled={true} label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
        <CheckBox label="label3" value="value3" />
      </CheckBoxGroup>
      <CheckBoxGroup
        name="name2"
        text="DisabledGroup"
        isLoading={false}
        disabled={true}
      >
        <CheckBox label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
        <CheckBox label="label3" value="value3" />
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
      <CheckBoxGroup name="name" text="Group" disabled={false} isLoading>
        <CheckBox label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
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
        error="Wrong value"
      >
        <CheckBox label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
      </CheckBoxGroup>
    </>
  )
}
