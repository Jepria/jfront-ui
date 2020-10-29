import React from "react"
import { render } from "@testing-library/react"
import { NumberInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element NumberInput", () => {
  render(<NumberInput />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<NumberInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test("NumberInput isError renders correctly", () => {
  const tools = render(
    <NumberInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("NumberInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <NumberInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
