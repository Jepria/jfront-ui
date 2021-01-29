import React from "react"
import { render } from "react-dom"
import { Loader } from "../src"

const container = document.createElement("div")
document.body.appendChild(container)

test("Matches snapshot ", () => {
  render(<Loader header="Loading" text="please wait..." />, container)
  expect(document.body).toMatchSnapshot()
})
