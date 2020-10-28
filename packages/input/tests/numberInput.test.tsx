import { render } from "@testing-library/react"
import React from "react"
import { NumberInput } from "../src"
test("Checking for the existence of an element NumberInput", () => {
  render(<NumberInput />)
})
