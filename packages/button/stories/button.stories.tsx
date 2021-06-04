import * as React from "react"
import { Button } from "../src"

export default {
  title: "Button",
  decorators: [
    (StoryFn: Function) => (
      <div style={{ width: "200px" }}>
        <StoryFn />
      </div>
    ),
  ],
}

export const PrimaryButton = () => {
  return (
    <>
      <Button
        onClick={() => {
          console.log("click")
        }}
        primary
      >
        Text
      </Button>
    </>
  )
}

export const SimpleButton = () => {
  return (
    <>
      <Button
        onClick={() => {
          console.log("click")
        }}
      >
        Text
      </Button>
    </>
  )
}
export const ButtonDisabled = () => {
  return (
    <>
      <Button
        onClick={() => {
          console.log("click")
        }}
        disabled={true}
      >
        Text
      </Button>
    </>
  )
}
