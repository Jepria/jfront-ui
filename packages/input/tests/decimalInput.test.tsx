import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { DecimalInput, TextInput } from "../src"
import { Label } from "@jfront/ui-label"
import { act } from "react-dom/test-utils"

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

//todo DecimalInput test
/*test("Entering a value in DecimalInput", () => {
    let inputTextInput
    render(
      <DecimalInput
        name="InputTextName"
        aria-label="test-label"
      />
    )

  const input = screen.getAllByRole("textbox")[0];
    act(() => {
    fireEvent.click(input)
    fireEvent.keyPress(input, { key: '1', code: '49' })
    fireEvent.click(input)
    })
  console.log(screen.debug())

  // console.log(input)

  // expect(inputTextInput).toEqual("Test text")
})*/
