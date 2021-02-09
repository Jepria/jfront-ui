import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { RadioGroup } from "../src"
import { Radio } from "../src"

test("Checking for the existence of an element RadioGroup", () => {
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

test("Checking when clicking on Radio in RadioGroup", () => {
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

  expect(pressed).toEqual("value2")
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(
    <RadioGroup name="name" isLoading={false}>
      <Radio disabled={true} label="label1" value="value1" />
      <Radio label="label2" value="value2" />
      <Radio label="label3" value="value3" />
    </RadioGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test.skip("RadioGroup isLoading renders correctly", () => {
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

test.skip("RadioGroup isError renders correctly", () => {
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
