import * as React from "react"
import { PagingToolBar } from "../src";

export default {
  title: "PagingToolBar",
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  const onChange = () => {console.log('onChange()')}

  return (
    <>
      <PagingToolBar
       pageCount={2}/>
    </>
  )
}
