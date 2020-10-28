import { render } from "@testing-library/react"
import React from "react"
import { ComboBox } from "../src"

test("Checking for the existence of an element ComboBox", () => {
  expect(render(<ComboBox />))
})
