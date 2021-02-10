import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { SelectInput } from "../src"
import { Label } from "@jfront/ui-label"

test("Checking for the existence of an element SelectInput", () => {
  render(<SelectInput />)
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(<SelectInput name="InputTextName" />)
  expect(asFragment()).toMatchSnapshot()
})

test.skip("SelectInput isError renders correctly", () => {
  const tools = render(
    <SelectInput name="InputTextNameLoading" error="wrong value" />,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test.skip("SelectInput label renders correctly", () => {
  const tools = render(
    <div style={{ display: "inline-block" }}>
      <Label>Text label</Label>
      <SelectInput name="InputTextName" />
    </div>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("SelectInput item selection", () => {
  let itemSelection
  render(
    <SelectInput
      name="Select"
      onChange={(event) => {
        itemSelection = event.target.value
      }}
    >
      <option value="Apple">Apple</option>
      <option value="Peach">Peach</option>
      <option value="Orange">Orange</option>
    </SelectInput>,
  )
  const input = screen.getAllByRole("combobox")[0]
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: "Peach" } })
  fireEvent.focus(input)

  expect(itemSelection).toEqual("Peach")
})
