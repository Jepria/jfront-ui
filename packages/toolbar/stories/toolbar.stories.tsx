import * as React from "react"
import { Toolbar } from "../src/Toolbar"
import {
  ToolbarButtonFind,
  ToolbarButtonCreate,
  ToolbarButtonSave,
  ToolbarButtonEdit,
  ToolbarButtonDelete,
  ToolbarButtonView,
  ToolbarSplitter,
} from "../src/buttons"

export default {
  title: "Toolbar",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <Toolbar>
        <ToolbarButtonFind />
        <ToolbarSplitter />
        <ToolbarButtonCreate />
        <ToolbarSplitter />
        <ToolbarButtonSave />
        <ToolbarSplitter />
        <ToolbarButtonEdit />
        <ToolbarSplitter />
        <ToolbarButtonDelete />
        <ToolbarSplitter />
        <ToolbarButtonView />
      </Toolbar>
    </>
  )
}
