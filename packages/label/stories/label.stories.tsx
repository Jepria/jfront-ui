import * as React from "react"
import { Label } from "../src"

export default {
  title: "Label",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <Label>Text</Label>
    </>
  )
}
