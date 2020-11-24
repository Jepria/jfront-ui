import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { PagingToolBar } from "../src"

test("Checking for the existence of an element PagingToolBar", () => {
  render(<PagingToolBar pageCount={2} />)
})

test("Matches snapshot ", () => {
  const { asFragment } = render(<PagingToolBar pageCount={2} />)
  expect(asFragment()).toMatchSnapshot()
})
test("Enter values ​​in a string field", () => {
  let itemSelection
  render(
    <PagingToolBar
      onChange={(currentPageNumber) => {
        itemSelection = currentPageNumber
      }}
      pageCount={6}
    />,
  )

  const input = screen.getAllByRole("spinbutton")[0]
  fireEvent.click(screen.getAllByRole("button")[2])
  expect(itemSelection).toEqual(2)
})
