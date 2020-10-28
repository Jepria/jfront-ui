import * as React from "react"
import { Label } from "@jfront/ui-label"
import { NumberInput } from "../src"

export default {
  title: "NumberInput",
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
      <NumberInput name="InputTextName" />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <NumberInput name="InputTextNameLoading" isLoading />
    </>
  )
}

export const Error = () => {
  return (
    <>
      <NumberInput name="InputTextNameLoading" error="wrong value" />
    </>
  )
}

export const OutsideError = () => {
  const [error, setError] = React.useState("wrong value")

  return (
    <>
      <button
        onClick={() => {
          setError("wrong value")
        }}
      >
        Set Error
      </button>
      <button
        onClick={() => {
          setError(undefined)
        }}
      >
        Clear
      </button>
      <NumberInput name="InputTextNameLoading" error={error} />
    </>
  )
}

export const ExternalLabel = () => {
  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Label>Text label</Label>
        <NumberInput name="InputTextName" />
      </div>
    </>
  )
}

export const MinMax = () => {
  return (
    <>
      <NumberInput min={5} max={10} />
    </>
  )
}
