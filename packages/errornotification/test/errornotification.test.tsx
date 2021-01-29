import React from "react"
import { render } from "react-dom"
import { ErrorNotification } from "../src"
import { fireEvent, screen } from "@testing-library/react"

const container = document.createElement("div")
document.body.appendChild(container)

test("Matches snapshot ", () => {
  render(
    <ErrorNotification error={new Error("Test error")}>UI</ErrorNotification>,
    container,
  )
  expect(document.body).toMatchSnapshot()
})

test("Error capture", () => {
  render(
    <ErrorNotification>
      <button
        onClick={() => {
          throw new Error("test error")
        }}
      >
        button
      </button>
    </ErrorNotification>,
    container,
  )
  fireEvent.click(screen.getByText("button"))
  expect(screen.queryAllByText("test error")).toHaveLength(1)
})
