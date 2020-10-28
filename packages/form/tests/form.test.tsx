import { render } from "@testing-library/react"
import React from "react"
import { Form } from "../src"

test("Checking for the existence of an element Form, FormField", () => {
  render(<Form />)
})
