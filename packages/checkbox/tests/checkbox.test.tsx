import { render } from "@testing-library/react"
import React from "react"
import { CheckBox } from "../src"

test("Checking for the existence of an element CheckBox", () => {
  expect(render(<CheckBox />))
})
