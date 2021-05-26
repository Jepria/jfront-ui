import * as React from "react"
import { DualList } from "../src"

export default {
  title: "DualList",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [value, setValue] = React.useState(undefined)

  const options = [
    { name: "option1", value: 1 },
    { name: "option2", value: 2 },
    { name: "option3", value: 3 },
    { name: "option4", value: 4 },
    { name: "option5", value: 5 },
    { name: "option6", value: 6 },
  ]

  return (
    <>
      <DualList
        value={value}
        name="test"
        options={options}
        onSelectionChange={(name, value) => setValue(value)}
      />
    </>
  )
}

export const Clear = () => {
  const [value, setValue] = React.useState(undefined)

  const options = [
    { name: "option1", value: 1 },
    { name: "option2", value: 2 },
    { name: "option3", value: 3 },
    { name: "option4", value: 4 },
    { name: "option5", value: 5 },
    { name: "option6", value: 6 },
  ]

  return (
    <>
      <div>
        <button type="button" onClick={() => setValue(undefined)}>
          Clear
        </button>
      </div>
      <DualList
        value={value}
        name="test"
        options={options}
        onSelectionChange={(name, value) => setValue(value)}
      />
    </>
  )
}
