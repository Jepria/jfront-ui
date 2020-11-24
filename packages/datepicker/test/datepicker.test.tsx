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

  render(<DatePicker onChange={(name: Date) => {}} />)
  const input = screen.getByRole("textbox")

  expect(fireEvent.change(input, { target: { value: date } })).toBe(true)
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
