import * as React from "react"
import { useFormik } from "formik"
import { ComboBox } from "@jfront/ui-core"
import { CheckBoxGroup } from "@jfront/ui-checkbox-group"
import { CheckBox } from "@jfront/ui-checkbox"
import { useEffect } from "react"

interface FormData {
  fruit?: string
  statusCodeList?: string[]
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
    },
    onSubmit: (values) => {
      console.log("formik.values: ", values)
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.fruit) {
        errors.fruit = "Must be not empty"
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
      <form style={{ padding: "5px" }} onSubmit={formik.handleSubmit}>
        <ComboBox
          name="fruit"
          label="Fruit"
          options={[
            { name: "Apple", value: "Apple" },
            { name: "Orange", value: "Orange" },
            { name: "Water mellon", value: "Water mellon" },
            { name: "Grapes", value: "Grapes" },
            { name: "Peach", value: "Peach" },
          ]}
          value={formik.values.fruit}
          style={{ width: "200px" }}
          isLoading={fruit === undefined}
          onChangeValue={formik.setFieldValue}
          error={formik.errors["fruit"]}
        />
        <CheckBoxGroup
          name="statusCodeList"
          text={"ChechBox:"}
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
        <input type="submit" />
      </form>
    </div>
  )
}

export default App
