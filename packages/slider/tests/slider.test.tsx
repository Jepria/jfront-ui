import { render } from "@testing-library/react"
import React from "react"
import { SliderWrap } from "../src"

test("Checking for the existence of an element Slider", () => {
  expect(
    render(
      <div>
        <div>
          <SliderWrap min={20} max={30} defaultValue={25} />
        </div>
      </div>,
    ),
  )
})
