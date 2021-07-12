import * as React from "react"
import { handle, SliderWrap } from "../src"
import { useEffect, useState } from "react"
import { SelectInput } from "@jfront/ui-input"

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
const wrapperStyle = {
  width: 400,
  marginTop: 50,
  marginLeft: 10,
  display: "flex",
}

function log(value: any) {
  console.log(value)
}

export const BasicSlider = () => {
  return (
    <div style={wrapperStyle}>
      <div style={wrapperStyle}>
        <SliderWrap min={20} max={30} defaultValue={25} onChange={log} />
      </div>
    </div>
  )
}

export const SliderFloat = () => {
  return (
    <div style={wrapperStyle}>
      <SliderWrap
        min={20}
        max={3000}
        marks={{ 20: 20, 3000: 3000 }}
        defaultValue={25}
        handle={handle}
        step={200}
        onChange={log}
      />
    </div>
  )
}
export const SliderDisabled = () => {
  return (
    <div style={wrapperStyle}>
      <SliderWrap
        min={20}
        max={30}
        marks={{ 20: 20, 30: 30 }}
        defaultValue={25}
        onChange={log}
        disabled
      />
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
    </div>
  )
}

export const SliderOptionsFloat = () => {
  return (
    <div style={wrapperStyle}>
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

export const SliderSelectInput = () => {
  const slider = {
    isplay: "inline-block",
    position: "relative",
    "box-sizing": "border-box",
    outline: "none",
    right: "-50px",
    "padding-top": 10,
    "vertical-align": "middle",
    "z-index": "2",
  }
  const selectInput = {
    "border-bottom": "1px solid black",
    "border-top": "none",
    "border-left": "none",
    "border-right": "none",

    position: "absolute",
    font: "inherit",
    background: "transparent",
    color: "currentColor",
    outline: "none",
    margin: 0,
    "z-index": "1",
    width: " 500px",
    "vertical-align": "bottom",
    "text-align": " inherit",
  }
  const [value, setValue] = useState(0)
  const handleChange = (value: number) => {
    setValue(value)
  }

  return (
    <div style={wrapperStyle}>
      <SliderWrap
        style={slider}
        marks={{ 0: "", 20: "", 40: "", 100: "" }}
        defaultValue={25}
        handle={handle}
        value={value}
        step={200}
        onChange={(value1) => handleChange(value1)}
      />
      <SelectInput
        style={selectInput}
        name="Select"
        options={[
          { name: "0", value: "0" },
          { name: "20", value: "20" },
          { name: "40", value: "40" },
          { name: "100", value: "100" },
        ]}
        value={value}
        onChange={(event: any) => handleChange(event.target.value)}
      />
    </div>
  )
}
export const SliderOptionsMarks = () => {
  return (
    <div style={wrapperStyle}>
      <SliderWrap
        max={3}
        min={1}
        marks={{
          1: {
            style: {
              color: "#3529EAFF",
            },
            label: <strong>Рено</strong>,
          },
          2: {
            style: {
              color: "#a029ea",
            },
            label: <strong>Рэнд ровер</strong>,
          },
          3: "Бмв",
        }}
        step={null}
        onChange={log}
      />
    </div>
  )
}
