import * as React from "react"
import {
  Range,
  RangeOptions,
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

export const Basic = () => {
  return (
    <>
      <Range
        max={150}
        min={20}
        step={10}
        value={100}
        onChange={(value: number) => {
          console.log("value: ", value)
        }}
      />
    </>
  )
}

export const BasicOptions = () => {
  return (
    <>
      <RangeOptions
        options={[
          { name: "test1", value: 1 },
          { name: "test2", value: 2 },
          { name: "test3", value: 3 },
          { name: "test4", value: 4 },
          { name: "test5", value: 5 },
          { name: "test6", value: 6 },
          { name: "test7", value: 7 },
          { name: "test8", value: 8 },
          { name: "test9", value: 9 },
        ]}
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
