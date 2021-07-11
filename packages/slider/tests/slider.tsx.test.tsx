import { render } from "@testing-library/react"
import React from "react"
import { SliderWrap } from "../src"

test("Checking for the existence of an element Slider", () => {
  expect(
    render(
      <SliderWrap
        min={20}
        max={30}
        defaultValue={25}
        marks={{ 20: 20, 25: 25, 30: 30 }}
      />,
    ),
  )
})
