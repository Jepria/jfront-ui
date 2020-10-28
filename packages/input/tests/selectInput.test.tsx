import { render } from "@testing-library/react"
import React from "react"
import { SelectInput } from "../src"
test("Checking for the existence of an element SelectInput", () => {
  render(<SelectInput />)
})
