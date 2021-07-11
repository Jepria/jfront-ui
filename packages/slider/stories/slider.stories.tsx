import * as React from "react"
import { SliderWrap } from "../src"

export default {
  title: "Slider",
  decorators: [
    (StoryFn: Function) => (
      <div style={{ width: "200px" }}>
        <StoryFn />
      </div>
    ),
  ],
}

export const Basic = () => {
  return (
    <>
      <SliderWrap />
    </>
  )
}
