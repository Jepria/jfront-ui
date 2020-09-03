import * as React from "react"
import { SelectInput } from "../src"

export default {
  title: "SelectInput",
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
      <SelectInput label="Select input" name="Select">
        <option value="Apple">Apple</option>
        <option value="Peach">Peach</option>
        <option value="Orange">Orange</option>
      </SelectInput>
    </>
  )
}

export const BasicUsageOptions = () => {
  return (
    <>
      <SelectInput
        label="Select input"
        name="Select"
        options={[
          { name: "Apple", value: "Apple" },
          { name: "Peach", value: "Peach" },
          { name: "Orange", value: "Orange" },
        ]}
      />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <SelectInput name="Select" isLoading>
        <option value="Apple">Apple</option>
        <option value="Peach">Peach</option>
        <option value="Orange">Orange</option>
      </SelectInput>
    </>
  )
}

export const Error = () => {
  return (
    <>
      <SelectInput name="Select" error="wrong value">
        <option value="Apple">Apple</option>
        <option value="Peach">Peach</option>
        <option value="Orange">Orange</option>
      </SelectInput>
    </>
  )
}
