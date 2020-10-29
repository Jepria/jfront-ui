import { render } from "@testing-library/react"
import React from "react"
import { PagingToolBar } from "../src"

test("Checking for the existence of an element PagingToolBar", () => {
  render(<PagingToolBar pageCount={2} />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<PagingToolBar pageCount={2} />)
  expect(asFragment()).toMatchSnapshot()
})
