import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { Form } from "../src"

test("Checking for the existence of an element Form", () => {
  render(<Form />)
})

test("Entering data into a Form", () => {
  let textField
  render(
    <>
      <Form>
        <Form.Field>
          <Form.Label required>Text input:</Form.Label>
          <Form.Control>
            <input
              onChange={(event) => {
                textField = event.target.value
              }}
              type="text"
            />
          </Form.Control>
        </Form.Field>
      </Form>
    </>,
  )
  const input = screen.getAllByRole("textbox")[0]
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: "test" } })
  expect(textField).toEqual("test")
})

test("Entering a field from a list", () => {
  let textSelect
  render(
    <Form.Field>
      <Form.Label>Select input</Form.Label>
      <Form.Control>
        <select>
          <option value={1}>one</option>
          <option
            data-testid="itemClick"
            value={2}
            onClick={(event) => {
              textSelect = event.currentTarget.value
            }}
          >
            two
          </option>
          <option value={3}>three</option>
        </select>
      </Form.Control>
    </Form.Field>,
  )
  const input = screen.getByTestId("itemClick")
  fireEvent.click(input)
  expect(textSelect).toEqual("2")
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(
    <>
      <Form>
        <Form.Field>
          <Form.Label required>Text input:</Form.Label>
          <Form.Control>
            <input type="text" style={{ display: "inline-flex" }} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Select input</Form.Label>
          <Form.Control>
            <select style={{ display: "inline-flex" }}>
              <option value={1}>one</option>
              <option value={2}>two</option>
              <option value={3}>three</option>
            </select>
          </Form.Control>
        </Form.Field>
      </Form>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test.skip("Form required renders correctly", () => {
  const asFragment = render(
    <>
      <Form>
        <Form.Field>
          <Form.Label required>Select input</Form.Label>
          <Form.Control>
            <select style={{ display: "inline-flex" }}>
              <option value={1}>one</option>
              <option value={2}>two</option>
              <option value={3}>three</option>
            </select>
          </Form.Control>
        </Form.Field>
      </Form>
    </>,
  )
  expect(asFragment.asFragment()).toMatchSnapshot()
})

test.skip("Form isError renders correctly", () => {
  const asFragment = render(
    <>
      <Form>
        <Form.Field>
          <Form.Label>Select input</Form.Label>
          <Form.Control error="Error message">
            <select style={{ display: "inline-flex" }}>
              <option value={1}>one</option>
              <option value={2}>two</option>
              <option value={3}>three</option>
            </select>
          </Form.Control>
        </Form.Field>
      </Form>
    </>,
  )
  expect(asFragment.asFragment()).toMatchSnapshot()
})

test.skip("Form layout renders correctly", () => {
  const tools = render(
    <Form.FieldSet name="fields" legend="row">
      <Form.Field style={{ flexBasis: "50%" }}>
        <Form.Label>Text input:</Form.Label>
        <Form.Control>
          <input type="text" style={{ display: "inline-flex" }} />
        </Form.Control>
      </Form.Field>
      <Form.Field style={{ flexBasis: "50%" }}>
        <Form.Label>Select input</Form.Label>
        <Form.Control>
          <select style={{ display: "inline-flex" }}>
            <option value={1}>one</option>
            <option value={2}>two</option>
            <option value={3}>three</option>
          </select>
        </Form.Control>
      </Form.Field>
    </Form.FieldSet>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
