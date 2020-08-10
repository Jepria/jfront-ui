import * as React from "react"
import {GridTable} from "../src/common/GridTable";

export default {
  title: "GridTable",
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <GridTable
      />
    </>
  )
}
