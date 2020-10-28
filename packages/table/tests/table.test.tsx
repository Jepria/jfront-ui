import { render } from "@testing-library/react"
import React from "react"
import { Table } from "../src"

test("Checking for the existence of an element Table", () => {
  render(<Table />)
})
