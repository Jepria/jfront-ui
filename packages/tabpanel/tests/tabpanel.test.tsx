import { render } from "@testing-library/react"
import React from "react"
import { Tab, TabPanel } from "../src"
import { Toolbar, ToolbarButtonCreate } from "@jfront/ui-toolbar"

test("Checking for the existence of an element TabPanel", () => {
  render(<TabPanel />)
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(
    <TabPanel>
      <Tab>Tab1</Tab>
      <Tab>Tab2</Tab>
    </TabPanel>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test.skip("TabPanel with Toolbar renders correctly", () => {
  const tools = render(
    <>
      <TabPanel>
        <Tab onClick={() => {}}>Tab 1</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate />
      </Toolbar>
    </>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
