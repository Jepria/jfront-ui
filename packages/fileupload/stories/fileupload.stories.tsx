import * as React from "react"
import { FileUpload } from "../src"
import { Form } from "@jfront/ui-form"

export default {
  title: "FileUpload",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [values, setValues] = React.useState(undefined);

  console.log(values)

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Label>File input:</Form.Label>
          <Form.Control>
            <FileUpload value={values} onChange={(name, value) => setValues(value)}/>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  )
}

export const Error = () => {
  const [values, setValues] = React.useState(undefined);

  console.log(values)

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Label>File input:</Form.Label>
          <Form.Control>
            <FileUpload value={values} onChange={(name, value) => setValues(value)} error="error"/>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  )
}

export const IsLoading = () => {
  const [values, setValues] = React.useState(undefined);

  console.log(values)

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Label>File input:</Form.Label>
          <Form.Control>
            <FileUpload value={values} onChange={(name, value) => setValues(value)} isLoading/>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  )
}

export const Multiple = () => {
  const [values, setValues] = React.useState(undefined);

  console.log(values)

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Label>File input:</Form.Label>
          <Form.Control>
            <FileUpload multiple value={values} onChange={(name, value) => setValues(value)}/>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  )
}

export const AcceptExtension = () => {
  const [values, setValues] = React.useState(undefined);

  console.log(values)

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Label>File input:</Form.Label>
          <Form.Control>
            <FileUpload accept=".txt,.svg" value={values} onChange={(name, value) => setValues(value)}/>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  )
}

export const AcceptMimeType = () => {
  const [values, setValues] = React.useState(undefined);

  console.log(values)

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Label>File input:</Form.Label>
          <Form.Control>
            <FileUpload accept="image/*" value={values} onChange={(name, value) => setValues(value)}/>
          </Form.Control>
        </Form.Field>
      </Form>
    </>
  )
}