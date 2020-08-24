import * as React from "react"
import { CheckBox } from "../src"

export default {
  title: "CheckBox",
  decorators: [
    (StoryFn: Function) => (
      <div style={{ width: "200px" }}>
        <StoryFn />
      </div>
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <CheckBox label="CheckBox Name" />
    </>
  )
}
