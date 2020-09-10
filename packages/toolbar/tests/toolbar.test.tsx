import { render } from "@testing-library/react"
import React from "react"
import { Toolbar } from "../src"
import { ToolbarButtonBase } from "../src/buttons"

test("Checking for the existence of an element Toolbar", () => {
  render(<Toolbar />)
  render(<ToolbarButtonBase />)
})
