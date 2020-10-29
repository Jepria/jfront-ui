import { render } from "@testing-library/react"
import React from "react"
import { Form } from "../src"

test("Checking for the existence of an element Form, FormField", () => {
  render(<Form />)
})

test("Matches snapshot ", () => {
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

test("Form required renders correctly", () => {
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

test("Form isError renders correctly", () => {
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

test("Form layout renders correctly", () => {
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
