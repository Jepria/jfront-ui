import * as React from "react"
import {InputText} from "../src/InputText";

export default {
  title: "InputText",
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <InputText name="InputTextName"
      />
    </>
  )
}
