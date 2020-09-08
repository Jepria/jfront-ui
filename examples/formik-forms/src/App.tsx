import * as React from "react"
import { useFormik } from "formik"
import { ComboBox } from "@jfront/ui-core"
import { CheckBoxGroup } from "@jfront/ui-checkbox-group"
import { CheckBox } from "@jfront/ui-checkbox"

interface FormData {
  fruit: string
  statusCodeList?: string[]
}

function App() {
  const formik = useFormik<FormData>({
    initialValues: {
      fruit: "Apple",
    },
    onSubmit: (values) => {
      console.log("formik.values: ")
      console.log(values)
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.fruit) {
        errors.fruit = "Must be not empty"
      }
      return errors
    },
  })
  console.log("formik.values.statusCodeList " + formik.values.statusCodeList)
  const statusOptions = [
    { value: "value1", name: "name1" },
    { value: "value2", name: "name2" },
  ]

  return (
    <div>
      <form style={{ padding: "5px" }} onSubmit={formik.handleSubmit}>
        <label>
          Fruit:
          <ComboBox
            name="fruit"
            options={[
              { name: "", value: undefined },
              { name: "Apple", value: "Apple" },
              { name: "Orange", value: "Orange" },
              { name: "Water mellon", value: "Water mellon" },
              { name: "Grapes", value: "Grapes" },
              { name: "Peach", value: "Peach" },
            ]}
            style={{ width: "200px" }}
            onChangeValue={formik.setFieldValue}
            error={formik.errors["fruit"]}
          />
        </label>
        <label>
          <CheckBoxGroup
            name="statusCodeList"
            text={"ChechBox"}
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
                  return <CheckBox value={option.value} label={option.name} />
                })
              : null}
          </CheckBoxGroup>
        </label>
        <input type="submit" />
      </form>
    </div>
  )
}

export default App
