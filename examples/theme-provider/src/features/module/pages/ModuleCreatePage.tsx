import React from "react"
import {
  CheckBox,
  CheckBoxGroup,
  Column,
  ComboBox,
  DatePicker,
  DualList,
  Form,
  NumberInput,
  Radio,
  RadioGroup,
  Row,
  TextArea,
  TextInput,
  Tree,
  TreeData,
  Button,
} from "@jfront/ui-core"
import { useFormik } from "formik"
import { CreateItem } from "../api/types"
import { id } from "../api/ModuleApi"
import { useHistory } from "react-router"
import * as Yup from "yup"
import { useAppDispatch } from "../../../app/store/configureStore"
import { createRecord } from "../state/moduleCrudSlice"
import Color from "color"

const code = [
  { name: "code-001", value: "code-001" },
  { name: "code-002", value: "code-002" },
]

const cities = [
  { name: "Moscow", value: "Moscow" },
  { name: "Samara", value: "Samara" },
]

const types = [
  { name: "type-1", value: "type-1" },
  { name: "type-2", value: "type-2" },
  { name: "type-3", value: "type-3" },
  { name: "type-4", value: "type-4" },
]

const status = [
  { name: "New", value: "New" },
  { name: "Old", value: "Old" },
  { name: "Archived", value: "Archived" },
]

const tree: TreeData[] = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "11",
    value: "11",
    parentValue: "1",
    isLeaf: true,
  },
  {
    label: "12",
    value: "12",
    parentValue: "1",
  },
  {
    label: "121",
    value: "121",
    parentValue: "12",
    isLeaf: true,
  },
  {
    label: "122",
    value: "122",
    parentValue: "12",
    isLeaf: true,
  },
  {
    label: "13",
    value: "13",
    parentValue: "1",
    isLeaf: true,
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "21",
    value: "21",
    parentValue: "2",
  },
  {
    label: "211",
    value: "211",
    parentValue: "21",
    isLeaf: true,
  },
  {
    label: "212",
    value: "212",
    parentValue: "21",
    isLeaf: true,
  },
  {
    label: "22",
    value: "22",
    parentValue: "2",
    isLeaf: true,
  },
]

const validationSchema = Yup.object().shape({
  id: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  cities: Yup.array().required("Required").min(1, "Required"),
  categories: Yup.array().required("Required").min(1, "Required"),
  types: Yup.array().required("Required").min(1, "Required"),
  activeDate: Yup.date().required("Required"),
})

const Page = () => {
  const history = useHistory()
  const newId = id + 1
  const dispatch = useAppDispatch()
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik<CreateItem>({
    initialValues: {
      id: String(newId),
      status: "New",
      code: "code-001",
      cities: ["Moscow"],
      categories: ["121"],
      types: [],
      activeDate: new Date().toISOString(),
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch<any>(
        createRecord({
          ...values,
          types: values.types?.map((type) => type.value),
        }),
      )
      history.push(process.env.PUBLIC_URL)
    },
  })

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
      }}
    >
      <Row>
        <Column style={{ flex: 1 }}>
          <Form.FieldSet>
            <Form.Legend>Field set 1</Form.Legend>
            <Form.Field>
              <Form.Label required>id</Form.Label>
              <Form.Control error={errors.id}>
                <NumberInput
                  value={values.id}
                  name="id"
                  onChange={handleChange}
                  error={errors.id}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label required>name</Form.Label>
              <Form.Control error={errors.name}>
                <TextInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label required>description</Form.Label>
              <Form.Control error={errors.description}>
                <TextArea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={errors.description}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label required>code</Form.Label>
              <Form.Control error={errors.code}>
                <ComboBox
                  name="code"
                  value={values.code}
                  onSelectionChange={(name, value) =>
                    setFieldValue(name, value)
                  }
                  options={code}
                  error={errors.code}
                />
              </Form.Control>
            </Form.Field>
          </Form.FieldSet>
        </Column>
        <Column style={{ flex: 1, minWidth: "430px" }}>
          <Form.FieldSet>
            <Form.Legend>Field set 2</Form.Legend>
            <Form.Field>
              <Form.Label required>status</Form.Label>
              <Form.Control error={errors.status}>
                <RadioGroup
                  values={values.status}
                  onChange={(name = "status", value) =>
                    setFieldValue(name, value)
                  }
                  error={errors.status}
                >
                  {status.map((option) => (
                    <Radio
                      key={option.value}
                      label={option.name}
                      value={option.value}
                    />
                  ))}
                </RadioGroup>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label required>cities</Form.Label>
              <Form.Control error={errors.cities}>
                <CheckBoxGroup
                  values={values.cities}
                  onChange={(name = "cities", value) =>
                    setFieldValue(name, value)
                  }
                  error={errors.cities}
                >
                  {cities.map((option) => (
                    <CheckBox
                      key={option.value}
                      label={option.name}
                      value={option.value}
                    />
                  ))}
                </CheckBoxGroup>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label required>categories</Form.Label>
              <Form.Control error={errors.categories}>
                <Tree
                  defaultExpandedKeys={["1", "12"]}
                  value={values.categories}
                  onSelect={(value) => setFieldValue("categories", value)}
                  data={tree}
                  error={errors.categories}
                />
              </Form.Control>
            </Form.Field>
          </Form.FieldSet>
        </Column>
        <Column style={{ flex: 2 }}>
          <Form.FieldSet>
            <Form.Legend>Field set 3</Form.Legend>
            <Form.Field>
              <Form.Label required>types</Form.Label>
              <Form.Control style={{ maxWidth: "500px" }} error={errors.types}>
                <DualList
                  name="types"
                  value={values.types}
                  onSelectionChange={(name, value) =>
                    setFieldValue(name, value)
                  }
                  options={types}
                  error={errors.types}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label required>activeDate</Form.Label>
              <Form.Control error={errors.activeDate}>
                <DatePicker
                  selected={new Date(values.activeDate)}
                  onChange={() => {}}
                  error={errors.activeDate}
                />
              </Form.Control>
            </Form.Field>
          </Form.FieldSet>
        </Column>
      </Row>
      <div>
        <Button type="submit" primary>
          Сохранить
        </Button>
        <Button onClick={() => history.goBack()}>Отменить</Button>
      </div>
    </Form>
  )
}
export default Page
