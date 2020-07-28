import * as React from "react"
import {DatePicker} from "../src";

export default {
  title: "DatePicker",
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  const onChange = () => {console.log('onChange()')}

  return (
    <>
      <DatePicker
        onChange = {onChange}
      />
    </>
  )
}
