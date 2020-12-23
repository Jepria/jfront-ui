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

export const ChangeRotation = () => {
  const [orientation, setOrientation] = React.useState<"left" | "right">("left")

  return (
    <>
      <CheckBox
        orientation={orientation}
        label="CheckBox Name"
        onChange={(e) => {
          setOrientation((prev) => (prev === "left" ? "right" : "left"))
          console.log(orientation)
        }}
      />
    </>
  )
}
