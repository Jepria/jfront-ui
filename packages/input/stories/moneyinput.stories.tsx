import * as React from "react"
import { MoneyInput } from "../src"

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
