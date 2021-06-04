import * as React from "react"
import { TextInput } from "../src/TextInput"
import { Label } from "@jfront/ui-label"

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
      <TextInput name="InputTextName" />
    </>
  )
}

export const Disabled = () => {
  return (
    <>
      <TextInput name="InputTextName" disabled value="asd" />
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

export const ExternalLabel = () => {
  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Label>Text label</Label>
        <TextInput name="InputTextName" />
      </div>
    </>
  )
}
