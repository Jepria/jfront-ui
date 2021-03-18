import * as React from "react"
import { ErrorNotification } from "../src"

export default {
  title: "ErrorNotification",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <ErrorNotification error={new Error("Test error")}>UI</ErrorNotification>
  )
}

export const RenderError = () => {
  const TestError = () => {
    throw new Error("Test error")
  }
  return (
    <ErrorNotification>
      <TestError />
    </ErrorNotification>
  )
}
