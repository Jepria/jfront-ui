import * as React from "react"
import {
  AlertDialog,
  SimpleDialog,
  ErrorDialog,
  WarningDialog,
  FormDialog,
} from "../src"
import { useFormik } from "formik"
import { Form as Forms } from "@jfront/ui-form"
import { TextInput } from "@jfront/ui-input"

export default {
  title: "Dialog",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const Simple = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <SimpleDialog
        visible={visible}
        header="Simple dialog"
        onClose={() => setVisible(false)}
        closeOnOutsideClick
      >
        <ul>
          <li>Simple dialog</li>
          <li>Tap outside to close</li>
          <li>Click close button to close</li>
        </ul>
      </SimpleDialog>
    </>
  )
}

export const Alert = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <AlertDialog
        visible={visible}
        header="Alert dialog"
        message="Alert!"
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export const Error = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <ErrorDialog
        onClose={() => setVisible(false)}
        visible={visible}
        header="Error"
        errorId="211151515315135513"
        errorCode={500}
        errorDescription="Unhadled exception"
        errorMessage="SQL exception"
      />
    </>
  )
}

export const Warning = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <WarningDialog
        onClose={() => setVisible(false)}
        visible={visible}
        header="Warning dialog"
        message="Take attention to warning"
      />
    </>
  )
}

export const Formik = () => {
  const [visible, setVisible] = React.useState(true)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      input: "",
      inputt: "",
      inputtt: "",
    },
    onSubmit: (values) => {
      console.log(values)
      setVisible(false)
    },
  })

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <FormDialog
        header="Formik"
        visible={visible}
        onClose={() => setVisible(false)}
        handleSubmit={formik.handleSubmit}
      >
        <Forms.Field>
          <Forms.Label
            style={{
              minWidth: "unset",
              width: "unset",
              justifyContent: "flex-start",
            }}
          >
            Input1:
          </Forms.Label>
          <Forms.Control>
            <TextInput
              name="input"
              value={formik.values.input}
              onChange={formik.handleChange}
            />
          </Forms.Control>
        </Forms.Field>
        <Forms.Field>
          <Forms.Label
            style={{
              minWidth: "unset",
              width: "unset",
              justifyContent: "flex-start",
            }}
          >
            Input2:
          </Forms.Label>
          <Forms.Control>
            <TextInput
              name="inputt"
              value={formik.values.inputt}
              onChange={formik.handleChange}
            />
          </Forms.Control>
        </Forms.Field>
        <Forms.Field>
          <Forms.Label
            style={{
              minWidth: "unset",
              width: "unset",
              justifyContent: "flex-start",
            }}
          >
            Input3:
          </Forms.Label>
          <Forms.Control>
            <TextInput
              name="inputtt"
              value={formik.values.inputtt}
              onChange={formik.handleChange}
            />
          </Forms.Control>
        </Forms.Field>
      </FormDialog>
    </>
  )
}

export const Form = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <FormDialog
        header="Form"
        visible={visible}
        onClose={() => setVisible(false)}
        handleSubmit={(e) => {
          e.preventDefault()
          console.log("submit")
          setVisible(false)
        }}
      >
        <Forms.Field>
          <Forms.Label
            style={{
              minWidth: "unset",
              width: "unset",
              justifyContent: "flex-start",
            }}
          >
            Input:
          </Forms.Label>
          <Forms.Control>
            <TextInput name="input" />
          </Forms.Control>
        </Forms.Field>
      </FormDialog>
    </>
  )
}
