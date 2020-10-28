import { render } from "@testing-library/react"
import React from "react"
import { Toolbar } from "../src"

test("Checking for the existence of an element Toolbar", () => {
  render(<Toolbar />)
})
