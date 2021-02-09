import React from "react"
import { render } from "react-dom"
import { Link } from "../src"
import { fireEvent, screen } from "@testing-library/react"

const container = document.createElement("div")
document.body.appendChild(container)

test.skip("Matches snapshot ", () => {
  render(<Link href="/test">Test Link</Link>, container)
  expect(document.body).toMatchSnapshot()
})

test("link click", () => {
  render(
    <Link data-testid="a" href="/test">
      Test Link
    </Link>,
    container,
  )
  fireEvent.click(screen.getByTestId("a"))
  expect(window.location.pathname).toEqual("/test")
})
