import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { Simulate } from "react-dom/test-utils"
import { CheckBoxGroup } from "../src"
import { CheckBox } from "../../checkbox/src"

test("Checking for the existence of an element CheckBoxGroup", () => {
  expect(
    render(
      <CheckBoxGroup name="name" isLoading={false}>
        <CheckBox disabled={true} label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
        <CheckBox label="label3" value="value3" />
      </CheckBoxGroup>,
    ),
  )
})

test("Checking when clicking on CheckBox in CheckBoxGroup", () => {
  let pressed: any[] | undefined = []
  render(
    <CheckBoxGroup
      name="name"
      isLoading={false}
      onChange={(name, values) => {
        pressed = values
      }}
    >
      <CheckBox disabled={true} label="label1" value="value1" />
      <CheckBox label="label2" value="value2" />
      <CheckBox label="label3" value="value3" />
    </CheckBoxGroup>,
  )
  fireEvent.click(screen.getByLabelText("label1"))
  fireEvent.click(screen.getByLabelText("label2"))
  fireEvent.click(screen.getByLabelText("label1"))

  expect(pressed).toEqual(["value2"])
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <CheckBoxGroup name="name" isLoading={false}>
      <CheckBox disabled={true} label="label1" value="value1" />
      <CheckBox label="label2" value="value2" />
      <CheckBox label="label3" value="value3" />
    </CheckBoxGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("CheckBoxGroup isLoading renders correctly", () => {
  const tools = render(
    <div>
      <CheckBoxGroup name="name" disabled={false} isLoading>
        <CheckBox label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
      </CheckBoxGroup>
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("CheckBoxGroup isError renders correctly", () => {
  const tools = render(
    <div>
      <CheckBoxGroup name="name" disabled={false} error="Wrong value">
        <CheckBox label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
      </CheckBoxGroup>
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
