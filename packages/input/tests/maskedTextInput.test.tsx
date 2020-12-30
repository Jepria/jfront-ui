import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { MaskedTextInput } from "../src"

test("Checking for the existence of an element MaskedTextInput", () => {
  render(<MaskedTextInput mask="99/99/9999" name="Masked" showMask />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <MaskedTextInput mask="99/99/9999" name="Masked" showMask />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Error display MaskedTextInput", () => {
  const { asFragment } = render(
    <MaskedTextInput
      mask="99/99/9999"
      name="Masked"
      showMask
      error="wrong value"
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("isLoading  display MaskedTextInput", () => {
  const { asFragment } = render(
    <MaskedTextInput mask="99/99/9999" name="Masked" showMask isLoading />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Entering a value in MaskedTextInput", () => {
  let MaskedTextInputText
  render(
    <MaskedTextInput
      mask="99/99/9999"
      name="Masked"
      showMask
      onChange={(e) => {
        MaskedTextInputText = e.target.value
      }}
      onFocus={(event) => {
        MaskedTextInputText = event.target.value
      }}
      aria-label={"test-label"}
    />,
  )
  const input = screen.getByLabelText("test-label", { selector: "input" })
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 99999999 } })
  fireEvent.focus(input)

  expect(MaskedTextInputText).toEqual("99/99/9999")
})
