import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { DecimalInput, TextInput } from "../src"
import { Label } from "@jfront/ui-label"
import { act } from "react-dom/test-utils"
import { NumberFormatValues } from "react-number-format"

test("Checking for the existence of an element DecimalInput", () => {
  render(<DecimalInput />)
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(<DecimalInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test.skip("DecimalInput isError renders correctly", () => {
  const tools = render(
    <DecimalInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test.skip("DecimalInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <DecimalInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("Entering a value in DecimalInput", async () => {
  let inputTextInput
  render(
    <DecimalInput
      name="InputTextName"
      aria-label="test-label"
      onValueChange={(values: NumberFormatValues) => {
        inputTextInput = values.value
      }}
    />,
  )

  const input = screen.getByLabelText("test-label", { selector: "input" })

  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 54321 } })
  expect(inputTextInput).toEqual("54321")
})
