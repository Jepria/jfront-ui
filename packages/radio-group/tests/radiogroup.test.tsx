import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { RadioGroup } from "../src"
import { Radio } from "../src"

test("Checking for the existence of an element CheckBoxGroup", () => {
  expect(
    render(
      <RadioGroup name="name" isLoading={false}>
        <Radio disabled={true} label="label1" value="value1" />
        <Radio label="label2" value="value2" />
        <Radio label="label3" value="value3" />
      </RadioGroup>,
    ),
  )
})

test("Checking when clicking on CheckBox in CheckBoxGroup", () => {
  let pressed: any[] | undefined = []
  render(
    <RadioGroup
      name="name"
      isLoading={false}
      onChange={(name, values) => {
        pressed = values
      }}
    >
      <Radio disabled={true} label="label1" value="value1" />
      <Radio label="label2" value="value2" />
      <Radio label="label3" value="value3" />
    </RadioGroup>,
  )
  fireEvent.click(screen.getByLabelText("label1"))
  fireEvent.click(screen.getByLabelText("label2"))
  fireEvent.click(screen.getByLabelText("label1"))

  expect(pressed).toEqual(["value2"])
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <RadioGroup name="name" isLoading={false}>
      <Radio disabled={true} label="label1" value="value1" />
      <Radio label="label2" value="value2" />
      <Radio label="label3" value="value3" />
    </RadioGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("CheckBoxGroup isLoading renders correctly", () => {
  const tools = render(
    <div>
      <RadioGroup name="name" disabled={false} isLoading>
        <Radio label="label1" value="value1" />
        <Radio label="label2" value="value2" />
      </RadioGroup>
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("CheckBoxGroup isError renders correctly", () => {
  const tools = render(
    <div>
      <RadioGroup name="name" disabled={false} error="Wrong value">
        <Radio label="label1" value="value1" />
        <Radio label="label2" value="value2" />
      </RadioGroup>
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
