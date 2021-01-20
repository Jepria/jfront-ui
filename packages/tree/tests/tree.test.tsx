import React from "react"
import { render } from "@testing-library/react"
import { Tree, TreeItem } from "../src"

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <Tree showSelectAllCheckbox>
      <TreeItem label="1" value={1}>
        <TreeItem label="11" value={11} disabled>
          <TreeItem label="111" value={111} />
          <TreeItem label="112" value={112} />
        </TreeItem>
        <TreeItem label="12" value={12}>
          <TreeItem label="121" value={121} />
          <TreeItem label="122" value={122} />
        </TreeItem>
      </TreeItem>
      <TreeItem label="2" value={2}>
        <TreeItem label="21" value={21} />
        <TreeItem label="22" value={22} disabled />
      </TreeItem>
    </Tree>,
  )
  expect(asFragment()).toMatchSnapshot()
})
