import * as React from "react"
import { handle, SliderWrap } from "../src"
import Slider from "rc-slider"

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
const wrapperStyle = { width: 400, marginTop: 50, marginLeft: 10 }

function log(value: any) {
  console.log(value)
}

export const BasicSlider = () => {
  return (
    <div style={wrapperStyle}>
      <div style={wrapperStyle}>
        <SliderWrap min={20} max={30} defaultValue={25} onChange={log} />
      </div>
      <div style={wrapperStyle}>
        <SliderWrap
          min={20}
          max={30}
          defaultValue={25}
          onChange={log}
          marks={{ 20: 20, 25: 25, 30: 30 }}
        />
      </div>
      <div style={wrapperStyle}>
        <SliderWrap
          min={20}
          max={30}
          marks={{ 20: 20, 30: 30 }}
          defaultValue={25}
          handle={handle}
          onChange={log}
        />
      </div>
      <div style={wrapperStyle}>
        <SliderWrap
          min={20}
          max={30}
          marks={{ 20: 20, 30: 30 }}
          defaultValue={25}
          handle={handle}
          onChange={log}
          disabled
        />
      </div>
    </div>
  )
}
export const BasicSliderOptions = () => {
  return (
    <div style={wrapperStyle}>
      <div style={wrapperStyle}>
        <SliderWrap
          marks={{ 20: "", 40: "", 100: "" }}
          step={null}
          onChange={log}
        />
      </div>
      <div style={wrapperStyle}>
        <SliderWrap
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={log}
        />
      </div>
      <div style={wrapperStyle}>
        <SliderWrap
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          handle={handle}
          onChange={log}
        />
      </div>
    </div>
  )
}
