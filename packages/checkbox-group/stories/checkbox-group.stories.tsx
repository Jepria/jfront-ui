import * as React from "react"
import { CheckBoxGroup } from "../src"
import { CheckBox } from "@jfront/ui-checkbox"
import { Label } from "@jfront/ui-label"
import { useState, useEffect } from "react"

export default {
  title: "CheckBoxGroup",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [values, setValues] = useState<string[]>()

  return (
    <div>
      <Label>Group:</Label>
      <CheckBoxGroup
        name="name"
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
      <Label>
        Group:
        <CheckBoxGroup name="name" isLoading={false}>
          <CheckBox disabled={true} label="label1" value="value1" />
          <CheckBox label="label2" value="value2" />
          <CheckBox label="label3" value="value3" />
        </CheckBoxGroup>
      </Label>
      <Label>
        Group2:
        <CheckBoxGroup name="name2" isLoading={false} disabled={true}>
          <CheckBox label="label1" value="value1" />
          <CheckBox label="label2" value="value2" />
          <CheckBox label="label3" value="value3" />
        </CheckBoxGroup>
      </Label>
    </>
  )
}

export const Loading = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <Label>
        Group:
        <CheckBoxGroup name="name" disabled={false} isLoading>
          <CheckBox label="label1" value="value1" />
          <CheckBox label="label2" value="value2" />
        </CheckBoxGroup>
      </Label>
    </>
  )
}

export const Error = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <Label>
        Group:
        <CheckBoxGroup name="name" disabled={false} error="Wrong value">
          <CheckBox label="label1" value="value1" />
          <CheckBox label="label2" value="value2" />
        </CheckBoxGroup>
      </Label>
    </>
  )
}
