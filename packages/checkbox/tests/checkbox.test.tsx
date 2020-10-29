import { render } from "@testing-library/react"
import React from "react"
import { CheckBox } from "../src"

test("Checking for the existence of an element CheckBox", () => {
  expect(render(<CheckBox />))
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<CheckBox />)
  expect(asFragment()).toMatchSnapshot()
})

test("Checkbox renders correctly", () => {
  const tools = render(<CheckBox label="CheckBox Name" />)
  expect(tools.asFragment()).toMatchSnapshot()
})
