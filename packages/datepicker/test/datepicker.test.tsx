import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { DatePicker } from "../src"
import { ComboBox, ComboBoxItem } from "@jfront/ui-combobox/src"

const date = null
const onChange = () => {}

test("Checking for the existence of an element DatePicker", () => {
  render(<DatePicker onChange={onChange} />)
})

test("DatePicker data input ", () => {
  const options = {
    era: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }
  const date = new Date(2018, 6, 20, 0, 0, 0).toLocaleString("ru", options)
  let dateToCheck

  render(
    <DatePicker
      data-testid="DatePickerInputCheck"
      onChange={(name: Date) => {
        dateToCheck = name.toLocaleString("ru", options)
      }}
    />,
  )
  const input = screen.getByTestId("DatePickerInputCheck")
  fireEvent.mouseEnter(input)
  fireEvent.change(input, { target: { value: date } })
  expect(dateToCheck).toBe(date)
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
