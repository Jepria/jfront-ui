import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { NumberInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element NumberInput", () => {
  render(<NumberInput />)
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(<NumberInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test.skip("NumberInput isError renders correctly", () => {
  const tools = render(
    <NumberInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test.skip("NumberInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <NumberInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("Entering a value in NumberInput", () => {
  let inputTextInput
  render(
    <NumberInput
      onChange={(event) => {
        inputTextInput = event.target.value
      }}
      aria-label={"test-label"}
      name="InputTextName"
    />,
  )
  const input = screen.getByLabelText("test-label", { selector: "input" })
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 1337 } })

  expect(inputTextInput).toEqual("1337")
})
