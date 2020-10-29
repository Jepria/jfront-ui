import { render } from "@testing-library/react"
import React from "react"
import { Label } from "../src"
import { MoneyInput } from "@jfront/ui-input/src"

test("Checking for the existence of an element Label", () => {
  expect(render(<Label />))
})
test("Matches snapshot ", () => {
  const { asFragment } = render(<Label />)
  expect(asFragment()).toMatchSnapshot()
})

test("Label renders correctly", () => {
  const tools = render(<Label>Text</Label>)
  expect(tools.asFragment()).toMatchSnapshot()
})
