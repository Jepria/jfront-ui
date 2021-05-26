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
  const valueSpy = jest.fn()

  const TestComponent = () => {
    const [value, setValue] = React.useState<Array<any>>([])
    return (
      <DualList
        name="test"
        options={options}
        value={value}
        onSelectionChange={(name, value) => {
          valueSpy(value)
          setValue(value)
        }}
      />
    )
  }

  render(<TestComponent />, container)
  fireEvent.dblClick(screen.getByTitle("option1"))
  fireEvent.dblClick(screen.getByTitle("option2"))
  expect(valueSpy.mock.calls[valueSpy.mock.calls.length - 1][0]).toEqual(
    expect.arrayContaining([options[0], options[1]]),
  )
})

test("find an element and move it to the right", () => {
  const valueSpy = jest.fn()

  const TestComponent = () => {
    const [value, setValue] = React.useState<Array<any>>([])
    return (
      <DualList
        name="test"
        options={options}
        value={value}
        onSelectionChange={(name, value) => {
          valueSpy(value)
          setValue(value)
        }}
      />
    )
  }

  render(<TestComponent />, container)
  const input = screen.getAllByRole("textbox")[0]
  fireEvent.click(input)
  fireEvent.change(input, { target: { value: "option6" } })
  fireEvent.dblClick(screen.getAllByRole("option")[0])
  expect(valueSpy.mock.calls[valueSpy.mock.calls.length - 1][0]).toEqual(
    expect.arrayContaining([options[5]]),
  )
})

test("move all elements to the right by pressing the button ", () => {
  const valueSpy = jest.fn()

  const TestComponent = () => {
    const [value, setValue] = React.useState<Array<any>>([])
    return (
      <DualList
        name="test"
        options={options}
        value={value}
        onSelectionChange={(name, value) => {
          valueSpy(value)
          setValue(value)
        }}
      />
    )
  }

  render(<TestComponent />, container)
  fireEvent.click(screen.getAllByRole("button")[0])
  expect(valueSpy.mock.calls[valueSpy.mock.calls.length - 1][0]).toEqual(
    expect.arrayContaining(options),
  )
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
