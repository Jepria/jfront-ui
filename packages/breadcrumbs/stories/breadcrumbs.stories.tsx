import * as React from "react"
import { Breadcrumbs } from "../src"
import { Link } from "@jfront/ui-link"
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
        <Link href="/link1">Link1</Link>
        <Link href="/link2">Link2</Link>
        <Link href="/link3">Link3</Link>
        <Link href="/link4">Link4</Link>
        <Link>Current page</Link>
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
            <Link href="/link1">Root</Link>
            <Link href="/link2">Prev module 1</Link>
            <Link href="/link3">Prev module 2</Link>
            <Link href="/link4">Prev module 3</Link>
            <Link
              style={!selected ? { cursor: "pointer" } : undefined}
              onClick={() => setSelected(true)}
            >
              Current module
            </Link>
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
          <Link href="/link1">Root</Link>
          <Link href="/link2">Prev module 1</Link>
          <Link href="/link3">Prev module 2</Link>
          <Link href="/link4">Prev module 3</Link>
          {!selected && (
            <Link href="/link5" onClick={() => setSelected(true)}>
              Current module
            </Link>
          )}
          <Link onClick={() => setSelected(true)}>
            {selected ? "Current module" : "Child module"}
          </Link>
        </Breadcrumbs>
        <ToolbarSplitter />
        <ToolbarButtonCreate />
        <ToolbarButtonDelete />
      </Toolbar>
    </>
  )
}
