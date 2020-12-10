import * as React from "react"
import { MaskedTextInput } from "../src"

export default {
  title: "MaskedTextInput",
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
      <MaskedTextInput
        mask="99/99/9999"
        name="Masked"
        showMask
        onChange={(e) => console.log(e.target.value)}
      />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <MaskedTextInput mask="99/99/9999" name="Masked" showMask isLoading />
    </>
  )
}

export const Error = () => {
  return (
    <>
      <MaskedTextInput
        mask="99/99/9999"
        name="Masked"
        showMask
        error="wrong value"
      />
    </>
  )
}
