import { render } from "@testing-library/react"
import React from "react"
import { Slider } from "../src"

test("Checking for the existence of an element Slider", () => {
  expect(render(
    <Slider
      initial={125}
      max={150}
    />
  ))
})


