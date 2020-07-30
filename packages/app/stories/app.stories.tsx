import * as React from "react"
import {JepAppContext} from "../src";

export default {
  title: "App",
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <div>Нужен ли App в Storybook ?</div>
    </>
  )
}
