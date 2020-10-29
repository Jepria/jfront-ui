import { render } from "@testing-library/react"
import React from "react"
import { MoneyInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element MoneyInput", () => {
  render(<MoneyInput />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<MoneyInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})
//todo isLoading Warning
test("MoneyInput isLoading renders correctly", () => {
  const tools = render(<MoneyInput name="InputTextNameLoading" isLoading />)
  expect(tools.asFragment()).toMatchSnapshot()
})

test("MoneyInput isError renders correctly", () => {
  const tools = render(
    <MoneyInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("MoneyInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <MoneyInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
