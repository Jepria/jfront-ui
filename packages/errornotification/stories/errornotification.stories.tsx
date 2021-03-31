import * as React from "react"
import { ErrorNotification } from "../src"

export default {
  title: "ErrorNotification",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [error, setError] = React.useState("Test error")
  return (
    <ErrorNotification error={error} onClose={() => setError(undefined)}>
      <button onClick={() => setError("Test error")}>throw error</button>
    </ErrorNotification>
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
