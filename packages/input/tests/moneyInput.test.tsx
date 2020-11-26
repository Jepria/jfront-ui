import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { DecimalInput, MoneyInput } from "../src"
import { Label } from "@jfront/ui-label"
import { NumberFormatValues } from "react-number-format"

test("Checking for the existence of an element MoneyInput", () => {
  render(<MoneyInput />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<MoneyInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})
//todo isLoading Warning
// test("MoneyInput isLoading renders correctly", () => {
//   const tools = render(<MoneyInput name="InputTextNameLoading" isLoading />)
//   expect(tools.asFragment()).toMatchSnapshot()
// })

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

test("Entering a value in MoneyInput", () => {
  let inputMoneyInput
  render(
    <MoneyInput
      name="InputTextName"
      aria-label="test-label"
      onValueChange={(values: NumberFormatValues) => {
        inputMoneyInput = values.value
      }}
    />,
  )

  const input = screen.getByLabelText("test-label", { selector: "input" })

  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 54321.0 } })

  expect(inputMoneyInput).toEqual("54321" + ".00")
})
