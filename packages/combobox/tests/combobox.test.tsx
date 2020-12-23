import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { ComboBox, ComboBoxItem } from "../src"

test("Checking for the existence of an element ComboBox", () => {
  expect(render(<ComboBox />))
})

test("Checking text input in a field", () => {
  let idElementSelect = 0
  render(
    <ComboBox
      onSelectionChange={(name, value) => {
        idElementSelect = value
      }}
    >
      <ComboBoxItem data-testid="itemCheck" value={1} label="test1" />
      <ComboBoxItem value={2} label="test2" />
      <ComboBoxItem value={3} label="test14" />
    </ComboBox>,
  )

  fireEvent.click(screen.getByRole("button"))
  fireEvent.click(screen.getByTestId("itemCheck"))
  expect(idElementSelect).toEqual(1)
})
test("Matches snapshot ", () => {
  const { asFragment } = render(
    <ComboBox onSelectionChange={(name, value) => console.log(value)}>
      <ComboBoxItem value={1} label="test1" />
      <ComboBoxItem value={2} label="test2" />
      <ComboBoxItem value={3} label="test3" />
    </ComboBox>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("ComboBox isLoading renders correctly", () => {
  const tools = render(
    <>
      <ComboBox
        onSelectionChange={(name, value) => console.log(value)}
        isLoading
      >
        <ComboBoxItem value={1} label="test1" />
        <ComboBoxItem value={2} label="test2" />
      </ComboBox>
    </>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
test("ComboBox isError renders correctly", () => {
  const tools = render(
    <>
      <ComboBox
        onSelectionChange={(name, value) => console.log(value)}
        style={{ width: "200px" }}
        error="error"
      >
        <ComboBoxItem value={1} label="test1" />
        <ComboBoxItem value={2} label="test2" />
      </ComboBox>
    </>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("undefined option exception", () => {
  let idElementSelect = 0
  render(
    <ComboBox
      onSelectionChange={(name, value) => {
        idElementSelect = value
      }}
    >
      <ComboBoxItem value={undefined} label="" />
      {[
        { name: "Apple", value: "Apple" },
        { name: "Orange", value: "Orange" },
        {
          "data-testid": "itemCheck",
          name: "Water mellon",
          value: "Water mellon",
        },
        { name: "Grapes", value: "Grapes" },
        { name: "Peach", value: "Peach" },
      ].map((option) => (
        <ComboBoxItem
          key={option.value}
          data-testid={option["data-testid"]}
          label={option.name}
          value={option.value}
        />
      ))}
    </ComboBox>,
  )

  fireEvent.click(screen.getByRole("button"))
  fireEvent.click(screen.getByTestId("itemCheck"))
  expect(idElementSelect).toEqual("Water mellon")
})

test("null child exception", () => {
  let idElementSelect = 0
  render(
    <ComboBox
      onSelectionChange={(name, value) => {
        idElementSelect = value
      }}
    >
      <ComboBoxItem value={undefined} label="" />
      {[
        { name: "Apple", value: "Apple" },
        { name: "Orange", value: "Orange" },
        {
          "data-testid": "itemCheck",
          name: "Water mellon",
          value: "Water mellon",
        },
        { name: "Grapes", value: "Grapes" },
        { name: "Peach", value: "Peach" },
      ].map((option) => (
        <ComboBoxItem
          key={option.value}
          data-testid={option["data-testid"]}
          label={option.name}
          value={option.value}
        />
      ))}
      {null}
    </ComboBox>,
  )

  fireEvent.click(screen.getByRole("button"))
  fireEvent.click(screen.getByTestId("itemCheck"))
  expect(idElementSelect).toEqual("Water mellon")
})