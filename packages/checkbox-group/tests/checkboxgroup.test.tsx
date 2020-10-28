import { render } from "@testing-library/react"
import React from "react"
import { CheckBoxGroup } from "../src"
import { CheckBox } from "../../checkbox/src"

test("Checking for the existence of an element CheckBoxGroup", () => {
  expect(
    render(
      <CheckBoxGroup name="name" isLoading={false}>
        <CheckBox disabled={true} label="label1" value="value1" />
        <CheckBox label="label2" value="value2" />
        <CheckBox label="label3" value="value3" />
      </CheckBoxGroup>,
    ),
  )
})
