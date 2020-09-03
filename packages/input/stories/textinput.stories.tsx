import * as React from "react"
import { TextInput } from "../src/TextInput"

export default {
  title: "TextInput",
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
      <TextInput label="Text input" name="InputTextName" />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <TextInput name="InputTextNameLoading" isLoading />
    </>
  )
}

export const Error = () => {
  return (
    <>
      <TextInput name="InputTextNameLoading" error="wrong value" />
    </>
  )
}
