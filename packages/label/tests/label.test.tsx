import { render } from "@testing-library/react"
import React from "react"
import { Label } from "../src"

test("Checking for the existence of an element Label", () => {
  expect(render(<Label />))
})
