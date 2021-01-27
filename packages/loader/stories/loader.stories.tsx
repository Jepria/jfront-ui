import * as React from "react"
import { Loader } from "../src"

export default {
  title: "Loader",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return <Loader header="Loading" text="please wait..." />
}
