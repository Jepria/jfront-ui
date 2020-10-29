import { render } from "@testing-library/react"
import React from "react"
import { ToolbarButtonBase } from "../src/buttons"

test("Checking for the existence of an element ToolbarButtonBase", () => {
  render(<ToolbarButtonBase />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<ToolbarButtonBase />)
  expect(asFragment()).toMatchSnapshot()
})
