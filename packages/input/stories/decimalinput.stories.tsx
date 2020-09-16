import * as React from "react"
import { DecimalInput } from "../src"

export default {
  title: "DecimalInput",
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
      <DecimalInput label="Text input" name="InputTextName" />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <DecimalInput name="InputTextNameLoading" isLoading />
    </>
  )
}

export const Error = () => {
  return (
    <>
      <DecimalInput name="InputTextNameLoading" error="wrong value" />
    </>
  )
}
