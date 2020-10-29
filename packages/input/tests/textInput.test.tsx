import React from "react"
import { render } from "@testing-library/react"
import { TextInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element TextInput", () => {
  render(<TextInput />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<TextInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test("TextInput isLoading   renders correctly", () => {
  const tools = render(<TextInput name="InputTextNameLoading" isLoading />)
  expect(tools.asFragment()).toMatchSnapshot()
})

test("TextInput isError   renders correctly", () => {
  const tools = render(
    <TextInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("TextInput label   renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <TextInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
