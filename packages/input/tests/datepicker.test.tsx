import { render } from "@testing-library/react"
import React from "react"
import {
  DecimalInput,
  MoneyInput,
  NumberInput,
  SelectInput,
  TextInput,
} from "../src"
test("Checking for the existence of an element Input", () => {
  render(<DecimalInput />)
  render(<TextInput />)
  render(<SelectInput />)
  render(<NumberInput />)
  render(<MoneyInput />)
})
