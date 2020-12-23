import { render } from "@testing-library/react"
import React from "react"
import {
  WarningDialog,
  SimpleDialog,
  FormDialog,
  ErrorDialog,
  AlertDialog,
} from "../src"

test("Matches snapshot", () => {
  const { asFragment } = render(
    <WarningDialog
      visible
      header="Warning dialog"
      message="Take attention to warning"
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Matches snapshot", () => {
  const { asFragment } = render(
    <SimpleDialog visible header="Simple dialog" closeOnOutsideClick>
      <ul>
        <li>Simple dialog</li>
        <li>Tap outside to close</li>
        <li>Click close button to close</li>
      </ul>
    </SimpleDialog>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Matches snapshot", () => {
  const { asFragment } = render(
    <FormDialog visible handleSubmit={null}>
      <input type="text" />
    </FormDialog>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Matches snapshot", () => {
  const { asFragment } = render(
    <ErrorDialog
      visible
      header="Error"
      errorId="211151515315135513"
      errorCode={500}
      errorDescription="Unhadled exception"
      errorMessage="SQL exception"
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Matches snapshot", () => {
  const { asFragment } = render(
    <AlertDialog visible header="Alert dialog" message="Alert!" />,
  )
  expect(asFragment()).toMatchSnapshot()
})
