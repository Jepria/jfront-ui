import { render, act, screen, waitFor } from "@testing-library/react"
import React from "react"
import { DatePicker } from "../src"

test("test", () => {
  render(<DatePicker onChange={console.log} />)
})