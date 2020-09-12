import * as React from "react"
import { Form } from "../src"
import { Column, Row } from "@jfront/ui-layout"

export default {
  title: "Form",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
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
    </>
  )
}

export const FieldSet = () => {
  return (
    <>
      <Form>
        <Form.FieldSet name="fields" legend="fields">
          <Form.Field>
            <Form.Label>Text input:</Form.Label>
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
        </Form.FieldSet>
      </Form>
    </>
  )
}

export const Required = () => {
  return (
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
    </>
  )
}

export const ErrorMessage = () => {
  return (
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
    </>
  )
}

export const GridLayout = () => {
  return (
    <>
      <Form>
        <Form.FieldSet name="fields" legend="row">
          <Row>
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
          </Row>
        </Form.FieldSet>
        <Row>
          <Column style={{ flexGrow: 1 }}>
            <Form.FieldSet name="fields" legend="col1">
              <Form.Field>
                <Form.Label>Text input:</Form.Label>
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
            </Form.FieldSet>
            <Form.FieldSet name="fields" legend="col1">
              <Form.Field>
                <Form.Label>Text input:</Form.Label>
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
            </Form.FieldSet>
          </Column>
          <Column style={{ flexGrow: 1 }}>
            <Form.FieldSet name="fields" legend="col2">
              <Form.Field>
                <Form.Label>Text input:</Form.Label>
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
            </Form.FieldSet>
            <Form.FieldSet name="fields" legend="col2">
              <Form.Field>
                <Form.Label>Text input:</Form.Label>
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
            </Form.FieldSet>
          </Column>
        </Row>
      </Form>
    </>
  )
}
