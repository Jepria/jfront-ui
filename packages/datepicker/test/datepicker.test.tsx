import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { DatePicker } from "../src"
import { ComboBox, ComboBoxItem } from "@jfront/ui-combobox/src"

const date = null
const onChange = () => {}

test("Checking for the existence of an element DatePicker", () => {
  render(<DatePicker onChange={onChange} />)
})

//todo make normal time type
test("DatePicker data input ", () => {
  let dateToCheck
  render(
    <DatePicker
      data-testid="DatePickerInputCheck"
      onChange={(name: Date) => {
        dateToCheck = name
      }}
    />,
  )
  const input = screen.getByTestId("DatePickerInputCheck")
  fireEvent.mouseEnter(input)
  fireEvent.change(input, { target: { value: "2020-05-10" } })
  expect(dateToCheck).toEqual(new Date("2020-05-09T21:00:00.000Z")) //Дата при задавание в поле input из "2020-05-10" из за часовых часов превращается в "2020-05-09T21:00:00.000Z"//todo сделать нормально
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <DatePicker selected={date} onChange={onChange} />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("DatePicker isLoading renders correctly", () => {
  const tools = render(
    <DatePicker selected={date} onChange={onChange} isLoading />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("DatePicker isError renders correctly", () => {
  const { asFragment } = render(
    <DatePicker selected={date} onChange={onChange} error="Wrong value" />,
  )
  expect(asFragment()).toMatchSnapshot()
})
