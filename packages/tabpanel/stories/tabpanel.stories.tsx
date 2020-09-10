import * as React from "react"
import { Tab, TabPanel } from "../src/TabPanel"

export default {
  title: "TabPanel",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <TabPanel>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </TabPanel>
    </>
  )
}
