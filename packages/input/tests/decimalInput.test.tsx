import { render } from "@testing-library/react"
import React from "react"
import { DecimalInput } from "../src"
test("Checking for the existence of an element DecimalInput", () => {
  render(<DecimalInput />)
})
