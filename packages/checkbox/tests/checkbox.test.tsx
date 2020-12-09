import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { CheckBox } from "../src"

test("Checking for the existence of an element CheckBox", () => {
  expect(render(<CheckBox />))
})

test("Checking CheckBox clicking", () => {
  let checkBoxState = false
  render(
    <CheckBox
      label="label2"
      checked={checkBoxState}
      onChange={(checked) => {
        checkBoxState = checked.target.checked
      }}
    />,
  )
  fireEvent.click(screen.getByLabelText("label2"))
  expect(checkBoxState).toEqual(true)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<CheckBox />)
  expect(asFragment()).toMatchSnapshot()
})

test("Checkbox renders correctly", () => {
  const tools = render(<CheckBox label="CheckBox Name" />)
  expect(tools.asFragment()).toMatchSnapshot()
})
