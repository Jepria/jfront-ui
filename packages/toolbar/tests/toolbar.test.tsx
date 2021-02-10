import React from "react"
import { render } from "@testing-library/react"
import {
  Toolbar,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView,
  ToolbarSplitter,
} from "../src"

test("Checking for the existence of an element Toolbar", () => {
  render(<Toolbar />)
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(
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
    </Toolbar>,
  )
  expect(asFragment()).toMatchSnapshot()
})
