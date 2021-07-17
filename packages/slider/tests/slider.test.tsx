import { render } from "@testing-library/react"
import React from "react"
import { Slider } from "../src"
import { DatePicker } from "@jfront/ui-datepicker/src"

test("Checking for the existence of an element Slider", () => {
  expect(
    render(
      <div>
        <Slider min={20} max={30} defaultValue={25} />
      </div>,
    ),
  )
})

test.skip("Matches snapshot Slider", () => {
  const { asFragment } = render(
    <div>
      <Slider min={20} max={30} defaultValue={25} />
    </div>,
  )
  expect(asFragment()).toMatchSnapshot()
})
