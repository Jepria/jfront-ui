import React from "react"
import { render } from "react-dom"
import { DualList } from "../src"
import { fireEvent, screen } from "@testing-library/react"

const container = document.createElement("div")
document.body.appendChild(container)

const options = [
  { name: "option1", value: 1 },
  { name: "option2", value: 2 },
  { name: "option3", value: 3 },
  { name: "option4", value: 4 },
  { name: "option5", value: 5 },
  { name: "option6", value: 6 },
]
test("Checking moving items to another column", () => {
  let rightColumn
  render(
    <DualList
      name="test"
      options={options}
      onSelectionChange={(name, value) => {
        rightColumn = value
      }}
    />,
    container,
  )
  fireEvent.click(screen.getByTitle("option1"))
  fireEvent.click(screen.getByTitle("option2"))
  expect(rightColumn).toEqual([1, 2])
})

test("find an element and move it to the right", () => {
  let rightColumn
  render(
    <DualList
      name="test"
      options={options}
      onSelectionChange={(name, value) => {
        rightColumn = value
      }}
    />,
    container,
  )
  const input = screen.getAllByRole("textbox")[0]
  fireEvent.click(input)
  fireEvent.change(input, { target: { value: "option6" } })
  fireEvent.click(screen.getAllByRole("option")[0])
  expect(rightColumn).toEqual([1, 2, 6])
})

test("move all elements to the right by pressing the button ", () => {
  let rightColumn
  render(
    <DualList
      name="test"
      options={options}
      onSelectionChange={(name, value) => {
        rightColumn = value
      }}
    />,
    container,
  )
  fireEvent.click(screen.getAllByRole("button")[0])
  expect(rightColumn).toEqual([1, 2, 3, 4, 5, 6])
})

test.skip("Matches snapshot ", () => {
  render(
    <DualList
      name="test"
      options={options}
      onSelectionChange={(name, value) => console.log(name, value)}
    />,
    container,
  )
  expect(document.body).toMatchSnapshot()
})
