import { render } from "@testing-library/react"
import React from "react"
import { Tab, TabPanel } from "../src"

test("Checking for the existence of an element TabPanel", () => {
  render(<TabPanel />)
  render(<Tab />)
})
