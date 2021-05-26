import * as React from "react"
import { Slider } from "../src/Slider"

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

export const BasicUsage = () => {

  return (
    <>
      <Slider
        initial={125}
        max={150}
        onChange={(value:number) =>{
          console.log("value: ", value)
        }}
      />
    </>
  )
}

