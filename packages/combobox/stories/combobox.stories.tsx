import * as React from "react"
import { ComboBox, ComboBoxItem } from "../src"
import styled from "styled-components"

export default {
  title: "ComboBox",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <ComboBox
        onChangeValue={(name, value) => console.log(value)}
        style={{ width: "200px" }}
      >
        <ComboBoxItem value={1} label="test1" />
        <ComboBoxItem value={2} label="test2" />
        <ComboBoxItem value={3} label="test3" />
        <ComboBoxItem value={4} label="test4" />
        <ComboBoxItem value={5} label="test5" />
        <ComboBoxItem value={6} label="test6" />
        <ComboBoxItem value={7} label="test7" />
        <ComboBoxItem value={8} label="test8" />
        <ComboBoxItem value={9} label="test9" />
      </ComboBox>
    </>
  )
}

export const WithOptionsProp = () => {
  return (
    <>
      <ComboBox
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
        variant="jepria"
        style={{ width: "200px" }}
        onChangeValue={(name, value) => console.log(value)}
      />
    </>
  )
}
