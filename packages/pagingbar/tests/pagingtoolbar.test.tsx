import { render } from "@testing-library/react"
import React from "react"
import { PagingToolBar } from "../src"

test("Checking for the existence of an element PagingToolBar", () => {
  render(<PagingToolBar pageCount={2} />)
})
