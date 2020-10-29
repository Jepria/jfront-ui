import { render } from "@testing-library/react"
import React, { useState } from "react"
import { ComboBox, ComboBoxItem } from "../src"

test("Checking for the existence of an element ComboBox", () => {
  expect(render(<ComboBox />))
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <ComboBox onSelectionChange={(name, value) => console.log(value)}>
      <ComboBoxItem value={1} label="test1" />
      <ComboBoxItem value={2} label="test2" />
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
