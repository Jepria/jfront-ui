import { fireEvent, render, screen } from "@testing-library/react"
import { CheckBoxListInput, DecimalInput } from "../src"
import { Label } from "@jfront/ui-label"
import React from "react"

test("Checking for the existence of an element CheckBoxListInput", () => {
  render(
    <CheckBoxListInput
      options={[
        { name: "option1", value: 1 },
        { name: "option2", value: 2 },
        { name: "option3", value: 3 },
        { name: "option4", value: 4 },
      ]}
    />,
  )
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <CheckBoxListInput
      options={[
        { name: "option1", value: 1 },
        { name: "option2", value: 2 },
        { name: "option3", value: 3 },
        { name: "option4", value: 4 },
      ]}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Click CheckBoxListInput item", () => {
  let checkBoxListClickItems
  render(
    <CheckBoxListInput
      id={"1"}
      initialValue={[]}
      onChangeValue={(field, value) => {
        checkBoxListClickItems = value
      }}
      options={[
        { name: "option1", value: 1 },
        { name: "option2", value: 2 },
        { name: "option3", value: 3 },
        { name: "option4", value: 4 },
      ]}
    />,
  )
  const checkBox1 = screen.getAllByRole("checkbox")[2]
  const checkBox2 = screen.getAllByRole("checkbox")[1]
  fireEvent.click(checkBox2)
  fireEvent.click(checkBox1)
  expect(checkBoxListClickItems).toEqual([2, 3])
})
