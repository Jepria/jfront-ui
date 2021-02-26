import React from "react"
import { render } from "react-dom"
import { ErrorNotification } from "../src"
import { fireEvent, screen } from "@testing-library/react"

const container = document.createElement("div")
document.body.appendChild(container)

test.skip("Matches snapshot ", () => {
  render(
    <ErrorNotification error={new Error("Test error")}>UI</ErrorNotification>,
    container,
  )
  expect(document.body).toMatchSnapshot()
})

test("Error capture", () => {
  const ErrorTest = () => {
    throw new Error("test error")
  }
  render(
    <ErrorNotification>
      <ErrorTest />
    </ErrorNotification>,
    container,
  )
  expect(screen.queryAllByText("test error")).toHaveLength(1)
})
