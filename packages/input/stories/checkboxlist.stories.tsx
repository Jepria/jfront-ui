import * as React from "react"
import { CheckBoxListInput } from "../src"

export default {
  title: "CheckBoxListInput",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <CheckBoxListInput
        name="testfield"
        onChangeValue={(field, value) => {
          window.alert(value)
        }}
        options={[
          { name: "option1", value: 1 },
          { name: "option2", value: 2 },
          { name: "option3", value: 3 },
          { name: "option4", value: 4 },
        ]}
      />
    </>
  )
}
