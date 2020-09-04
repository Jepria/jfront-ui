import * as React from "react"
import { useFormik } from "formik"
import { ComboBox } from "@jfront/ui-core"

interface FormData {
  fruit: string
}

function App() {
  const formik = useFormik<FormData>({
    initialValues: {
      fruit: "Apple",
    },
    onSubmit: (values) => {
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
        <input type="submit" />
      </form>
    </div>
  )
}

export default App
