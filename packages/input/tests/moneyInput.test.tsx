import { render } from "@testing-library/react"
import React from "react"
import { MoneyInput } from "../src"
test("Checking for the existence of an element MoneyInput", () => {
  render(<MoneyInput />)
})
