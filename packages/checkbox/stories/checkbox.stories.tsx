import * as React from "react"
import { CheckBox } from "../src"

export default {
  title: "CheckBox",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <CheckBox label="CheckBox Name" />
    </>
  )
}
