import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { CheckBoxListInput, MaskedTextInput } from "../src"
import { AllByBoundAttribute } from "@testing-library/dom/types/queries"

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
    <MaskedTextInput mask="99/99/9999" name="Masked" showMask />,
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
      data-testid="itemCheck"
      onChange={(name, value) => {
        MaskedTextInputText = value
      }}
      onFocus={(event) => {
        MaskedTextInputText = event.target.value
      }}
      value={123456}
      aria-label={"test-label"}
    />,
  )
  const input = screen.getByLabelText("test-label", { selector: "input" })
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: 99999999 } })
  fireEvent.focus(input)

  expect(MaskedTextInputText).toEqual("99/99/9999")
})
