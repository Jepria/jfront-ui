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
  ToolbarButtonSearch,
  ToolbarButtonList,
} from "../src/buttons"

export default {
  title: "Toolbar",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <Toolbar>
        <ToolbarButtonCreate />
        <ToolbarButtonSave />
        <ToolbarButtonEdit />
        <ToolbarButtonDelete />
        <ToolbarButtonView />
        <ToolbarSplitter />
        <ToolbarButtonList />
        <ToolbarButtonFind />
        <ToolbarButtonSearch />
      </Toolbar>
    </>
  )
}
