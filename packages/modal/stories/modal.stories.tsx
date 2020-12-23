import * as React from "react"
import { Modal, ModalHeader, ModalFooter, ModalContent } from "../src"
import { useFormik } from "formik"
import { Form } from "@jfront/ui-form"
import { TextInput } from "@jfront/ui-input"

export default {
  title: "Modal",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        closeOnOutsideClick
      >
        <ModalHeader withCloseButton>Dialog</ModalHeader>
        <ModalContent>
          <ul>
            <li>Simple dialog</li>
            <li>Tap outside to close</li>
            <li>Click close button to close</li>
          </ul>
        </ModalContent>
      </Modal>
    </>
  )
}

export const CustomHeader = () => {
  const [visible, setVisible] = React.useState(true)

  const CustomHeader = () => <h3>A Problem in Need of a Creative Solution</h3>

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        closeOnOutsideClick
      >
        <ModalHeader as={CustomHeader} withCloseButton />
        <ModalContent>
          <p>
            In the 1870s, newspapers and printers faced a very specific and very
            costly problem. Photography was a new and exciting medium at the
            time. Readers wanted to see more pictures, but nobody could figure
            out how to print images quickly and cheaply.
          </p>
        </ModalContent>
        <ModalFooter>
          {() => (
            <button
              type="button"
              style={{ backgroundColor: "rgb(21, 66, 139)", color: "#fff" }}
            >
              Close
            </button>
          )}
        </ModalFooter>
      </Modal>
    </>
  )
}

export const WithButtons = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        closeOnOutsideClick
      >
        <ModalHeader withCloseButton>Dialog</ModalHeader>
        <ModalContent>
          <ul>
            <li>Simple dialog</li>
            <li>Tap outside to close</li>
            <li>Click close button to close</li>
          </ul>
        </ModalContent>
        <ModalFooter>
          {({ onClose }) => <button onClick={onClose}>Close</button>}
        </ModalFooter>
      </Modal>
    </>
  )
}

export const FormDialog = () => {
  const [visible, setVisible] = React.useState(true)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      input: "",
    },
    onSubmit: (values) => {
      console.log(values)
      setVisible(false)
    },
  })

  return (
    <>
      <button onClick={() => setVisible(true)}>tap to show dialog</button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <ModalHeader>Form Dialog</ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <Form.Field>
              <Form.Label
                style={{
                  minWidth: "unset",
                  width: "unset",
                  justifyContent: "flex-start",
                }}
              >
                Input:
              </Form.Label>
              <Form.Control>
                <TextInput name="input" onChange={formik.handleChange} />
              </Form.Control>
            </Form.Field>
          </ModalContent>
          <ModalFooter>
            <input type="submit" />
          </ModalFooter>
        </Form>
      </Modal>
    </>
  )
}
