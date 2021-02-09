import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Button } from "../src"

test("Checking for the existence of an element Button", () => {
  expect(render(<Button />))
})

test("Checking Button clicking", () => {
  let ButtonClick = false
  render(
    <Button
      onClick={() => {
        ButtonClick = true
      }}
      aria-label={"label2"}
      style={{
        width: "100px",
        height: "50px",
      }}
      value={"Text"}
    />,
  )
  fireEvent.click(screen.getByLabelText("label2"))
  expect(ButtonClick).toEqual(true)
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(<Button />)
  expect(asFragment()).toMatchSnapshot()
})
