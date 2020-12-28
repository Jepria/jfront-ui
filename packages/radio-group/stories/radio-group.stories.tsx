import * as React from "react"
import { useState, useEffect } from "react"
import { Label } from "@jfront/ui-label"
import { RadioGroup } from "../src"
import { Radio } from "../src"

export default {
  title: "RadioGroup",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [values, setValues] = useState<string[]>()

  return (
    <div>
      <Label>Group:</Label>
      <RadioGroup
        name="name"
        isLoading={false}
        disabled={false}
        values={values ? values : []}
        onChange={(name, _values) => {
          setValues(_values)
        }}
      >
        <Radio label="label1" value="value1" />
        <Radio label="label2" value="value2" />
      </RadioGroup>
    </div>
  )
}

export const Disabled = () => {
  const onChange = () => {
    console.log("onChange()")
  }

  return (
    <>
      <div>
        <Label>Group:</Label>
        <RadioGroup name="name" isLoading={false}>
          <Radio disabled={true} label="label1" value="value1" />
          <Radio label="label2" value="value2" />
          <Radio label="label3" value="value3" />
        </RadioGroup>
      </div>
      <div>
        <Label>Group2:</Label>
        <RadioGroup name="name2" isLoading={false} disabled={true}>
          <Radio label="label1" value="value1" />
          <Radio label="label2" value="value2" />
          <Radio label="label3" value="value3" />
        </RadioGroup>
      </div>
    </>
  )
}

export const Loading = () => {
  return (
    <div>
      <Label>Group:</Label>
      <RadioGroup name="name" disabled={false} isLoading>
        <Radio label="label1" value="value1" />
        <Radio label="label2" value="value2" />
      </RadioGroup>
    </div>
  )
}

export const Error = () => {
  return (
    <div>
      <Label>Group:</Label>
      <RadioGroup name="name" disabled={false} error="Wrong value">
        <Radio label="label1" value="value1" />
        <Radio label="label2" value="value2" />
      </RadioGroup>
    </div>
  )
}
