import * as React from "react"
import {
  Slider,
  SliderOptions,
  SliderOptionsPointer,
  SliderPointer,
} from "../src"

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
        onChange={(value: number) => {
          console.log("value: ", value)
        }}
      />
    </>
  )
}

export const UsagePoint = () => {
  return (
    <>
      <SliderPointer
        initial={125}
        max={150}
        onChange={(value: number) => {
          console.log("value: ", value)
        }}
      />
    </>
  )
}
export const UsageSliderOptions = () => {
  const options = ["1", "2", "3", "5"]
  return (
    <>
      <SliderOptions
        options={options}
        onChange={(value: number) => {
          console.log("value: ", value)
        }}
      />
    </>
  )
}

export const UsageSliderOptionsPoint = () => {
  const options = ["Один", "Два", "Три", "Тут можно многое написать"]
  return (
    <>
      <SliderOptionsPointer
        options={options}
        onChange={(value: number) => {
          console.log("value: ", value)
        }}
      />
    </>
  )
}
