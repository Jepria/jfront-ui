import { render } from "@testing-library/react"
import React from "react"
import { DatePicker } from "../src"

const date = null
const onChange = () => {}

test("Checking for the existence of an element DatePicker", () => {
  render(<DatePicker onChange={onChange} />)
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
