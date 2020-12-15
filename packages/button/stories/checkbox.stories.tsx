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

export const BasicUsage = () => {
  return (
    <>
      <Button
        onClick={() => {
          console.log("click")
        }}
        style={{
          width: "100px",
          height: "50px",
        }}
        value={"Text"}
      />
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
        style={{
          width: "100px",
          height: "50px",
        }}
        disabled={true}
        value={"Text"}
      />
    </>
  )
}
