import { render } from "@testing-library/react"
import React from "react"
import { Tab } from "../src"

test("Checking for the existence of an element Tab", () => {
  render(<Tab />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<Tab />)
  expect(asFragment()).toMatchSnapshot()
})
