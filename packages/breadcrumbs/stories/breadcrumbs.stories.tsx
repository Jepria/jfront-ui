import * as React from "react"
import { Breadcrumbs, BreadcrumsLink as NavLink } from "../src"
import { Tab, TabPanel } from "@jfront/ui-tabpanel"
import {
  Toolbar,
  ToolbarButtonCreate,
  ToolbarSplitter,
  ToolbarButtonDelete,
} from "@jfront/ui-toolbar"

export default {
  title: "Breadcrumbs",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      Breadcrumbs
      <Breadcrumbs>
        <NavLink href="/link1">Link1</NavLink>
        <NavLink href="/link2">Link2</NavLink>
        <NavLink href="/link3">Link3</NavLink>
        <NavLink href="/link4">Link4</NavLink>
        <NavLink>Current page</NavLink>
      </Breadcrumbs>
    </>
  )
}

export const InTabPanel = () => {
  const [selected, setSelected] = React.useState(true)

  return (
    <>
      <TabPanel>
        <Tab selected={selected} onClick={() => setSelected(true)}>
          <Breadcrumbs collapseMethod="dropdown">
            <NavLink href="/link1">Root</NavLink>
            <NavLink href="/link2">Prev module 1</NavLink>
            <NavLink href="/link3">Prev module 2</NavLink>
            <NavLink href="/link4">Prev module 3</NavLink>
            <NavLink
              style={!selected ? { cursor: "pointer" } : undefined}
              onClick={() => setSelected(true)}
            >
              Current module
            </NavLink>
          </Breadcrumbs>
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

export const InToolBar = () => {
  const [selected, setSelected] = React.useState(true)

  return (
    <>
      <TabPanel>
        <Tab selected={selected} onClick={() => setSelected(true)}>
          Current module
        </Tab>
        <Tab selected={!selected} onClick={() => setSelected(false)}>
          Child module
        </Tab>
      </TabPanel>
      <Toolbar>
        <Breadcrumbs
          style={{
            height: "22px",
            float: "left",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <NavLink href="/link1">Root</NavLink>
          <NavLink href="/link2">Prev module 1</NavLink>
          <NavLink href="/link3">Prev module 2</NavLink>
          <NavLink href="/link4">Prev module 3</NavLink>
          {!selected && (
            <NavLink href="/link5" onClick={() => setSelected(true)}>
              Current module
            </NavLink>
          )}
          <NavLink onClick={() => setSelected(true)}>
            {selected ? "Current module" : "Child module"}
          </NavLink>
        </Breadcrumbs>
        <ToolbarSplitter />
        <ToolbarButtonCreate />
        <ToolbarButtonDelete />
      </Toolbar>
    </>
  )
}
