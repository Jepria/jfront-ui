import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { DatePicker } from "../src"

const date = null
const onChange = (name: Date) => {
  console.log("name =", name, "| date =", date)
}

test("Checking for the existence of an element DatePicker", () => {
  render(<DatePicker onChange={onChange} />)
})

test("DatePicker data input ", () => {
  const date = "2018-05-05"
  const formattedDate = "05.05.2018"

  const myNewDate = new Date(
    new Date(date).getTime() + 60000 * new Date(date).getTimezoneOffset(),
  )
  let dates = new Date()
  render(
    <DatePicker
      onChange={(name: Date) => {
        dates = name
      }}
    />,
  )
  const input = screen.getByRole("textbox")
  fireEvent.change(input, { target: { value: formattedDate } })

  expect(new Date(Date.parse(dates.toString())).toString()).toBe(
    myNewDate.toString(),
  )
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
