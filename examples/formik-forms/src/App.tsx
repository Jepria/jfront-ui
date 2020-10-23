import * as React from "react"
import { useFormik } from "formik"
import { ComboBox, TextInput, DatePicker, NumberInput } from "@jfront/ui-core"
import { Form } from "@jfront/ui-form"
import { CheckBoxGroup } from "@jfront/ui-checkbox-group"
import { CheckBox } from "@jfront/ui-checkbox"
import { useEffect } from "react"
import { useRef } from "react"

interface FormData {
  fruit?: string
  statusCodeList?: string[]
  name?: string
  date?: Date
  numberInput?: number
}

function App() {
  const [fruit, setFruit] = React.useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      setFruit("Apple")
    }, [1000])
  }, [])

  const formik = useFormik<FormData>({
    enableReinitialize: true,
    initialValues: {
      fruit: fruit,
      statusCodeList: ["value1"],
    },
    onSubmit: (values) => {
      console.log("formik.values: ", values)
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.name) {
        errors.name = "Must be not empty"
      }
      if (!values.fruit) {
        errors.fruit = "Must be not empty"
      }
      if (!values.numberInput) {
        errors.numberInput = "Must be not empty"
      }
      return errors
    },
  })

  const statusOptions = [
    { value: "value1", name: "name1" },
    { value: "value2", name: "name2" },
  ]

  return (
    <div>
      <Form style={{ padding: "5px" }} onSubmit={formik.handleSubmit}>
        <Form.Field label="Name:" required>
          <Form.Control
            error={formik.errors["name"]}
            style={{ maxWidth: "200px" }}
          >
            <TextInput
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors["name"]}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field label="Date:">
          <DatePicker
            name="date"
            selected={formik.values.date}
            onChange={(date) => formik.setFieldValue("date", date)}
          />
        </Form.Field>
        <Form.Field label="Fruit:" required>
          <Form.Control
            error={formik.errors["fruit"]}
            style={{ maxWidth: "200px" }}
          >
            <ComboBox
              name="fruit"
              options={[
                { name: "Apple", value: "Apple" },
                { name: "Orange", value: "Orange" },
                { name: "Water mellon", value: "Water mellon" },
                { name: "Grapes", value: "Grapes" },
                { name: "Peach", value: "Peach" },
              ]}
              value={formik.values.fruit}
              isLoading={fruit === undefined}
              onSelectionChange={(name, newValue) => {
                console.log("onChange: " + newValue)
                formik.setFieldValue(name, newValue)
              }}
              error={formik.errors["fruit"]}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field label="Status code list:">
          <CheckBoxGroup
            name="statusCodeList"
            values={
              formik.values.statusCodeList ? formik.values.statusCodeList : []
            }
            onChange={(name, newValue) => {
              console.log("onChange: " + newValue)
              formik.setFieldValue(name, newValue)
            }}
          >
            {statusOptions
              ? statusOptions.map((option) => {
                  return (
                    <CheckBox
                      key={option.value}
                      value={option.value}
                      label={option.name}
                    />
                  )
                })
              : null}
          </CheckBoxGroup>
        </Form.Field>
        <Form.Field label="Number Input" required>
          <Form.Control
            error={formik.errors["numberInput"]}
            style={{ maxWidth: "200px" }}
          >
            <NumberInput
              name="numberInput"
              value={formik.values.numberInput}
              onChange={formik.handleChange}
              error={formik.errors["numberInput"]}
            />
          </Form.Control>
        </Form.Field>
        <input type="submit" style={{ width: "100px", marginLeft: "200px" }} />
      </Form>
    </div>
  )
}

export default App
