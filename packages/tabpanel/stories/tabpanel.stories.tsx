import * as React from "react"
import { Tab, TabPanel } from "../src/TabPanel"
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
} from "@jfront/ui-toolbar"

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

export const WithToolbar = () => {
  const [selected, setSelected] = React.useState(true)

  return (
    <>
      <TabPanel>
        <Tab selected={selected} onClick={() => setSelected(true)}>
          Tab 1
        </Tab>
        <Tab selected={!selected} onClick={() => setSelected(false)}>
          Tab 2
        </Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate />
        <ToolbarButtonDelete />
      </Toolbar>
    </>
  )
}
