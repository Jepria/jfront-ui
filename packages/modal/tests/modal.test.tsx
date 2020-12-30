import { render } from "@testing-library/react"
import React from "react"
import { Modal } from "../src"

test("Checking for the existence of an element Modal", () => {
  expect(render(<Modal visible>Text</Modal>))
})

test("Matches snapshot", () => {
  const { asFragment } = render(<Modal visible>Text</Modal>)
  expect(asFragment()).toMatchSnapshot()
})