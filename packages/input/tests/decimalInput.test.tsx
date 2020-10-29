import { render } from "@testing-library/react"
import React from "react"
import { DecimalInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element DecimalInput", () => {
  render(<DecimalInput />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<DecimalInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test("DecimalInput isError renders correctly", () => {
  const tools = render(
    <DecimalInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("DecimalInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <DecimalInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
