import * as React from "react"
import { MoneyInput } from "../src"
import { useState } from "react"
import { NumberFormatValues } from "react-number-format"

export default {
  title: "MoneyInput",
  decorators: [
    (StoryFn: Function) => (
      <div style={{ padding: "5px" }}>
        <StoryFn />
      </div>
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <MoneyInput name="InputTextName" />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <MoneyInput name="InputTextNameLoading" isLoading />
    </>
  )
}

export const Error = () => {
  return (
    <>
      <MoneyInput name="InputTextNameLoading" error="wrong value" />
    </>
  )
}

export const ClearValue = () => {
  const [val, setVal] = useState("")
  return (
    <>
      <MoneyInput
        name="InputTextNameLoading"
        error="wrong value"
        value={val}
        onValueChange={(values: NumberFormatValues) => {
          setVal(values.value)
        }}
      />
      <button
        onClick={() => {
          setVal("")
        }}
      >
        Clean
      </button>
    </>
  )
}
