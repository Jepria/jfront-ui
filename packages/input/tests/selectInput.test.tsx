import { render } from "@testing-library/react"
import React from "react"
import { SelectInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element SelectInput", () => {
  render(<SelectInput />)
})
test("Matches snapshot ", () => {
  const { asFragment } = render(<SelectInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test("SelectInput isError renders correctly", () => {
  const tools = render(
    <SelectInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("SelectInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <SelectInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
