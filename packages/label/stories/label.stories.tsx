import * as React from "react"
import { Label } from "../src"
import { TextInput } from "@jfront/ui-input"

export default {
  title: "Label",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <Label>Text</Label>
    </>
  )
}

export const WithInput = () => {
  return (
    <>
      <Label>Text</Label>
      <TextInput />
    </>
  )
}
