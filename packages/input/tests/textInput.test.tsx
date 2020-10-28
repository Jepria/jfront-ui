import { render } from "@testing-library/react"
import React from "react"
import { TextInput } from "../src"
test("Checking for the existence of an element TextInput", () => {
  render(<TextInput />)
})
