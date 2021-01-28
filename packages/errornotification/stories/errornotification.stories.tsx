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

export const CatchError = () => {
  return (
    <ErrorNotification>
      <div>
        Click button to throw error
        <button
          style={{ margin: "5px" }}
          onClick={() => {
            throw new Error("Error thrown")
          }}
        >
          Throw error
        </button>
      </div>
    </ErrorNotification>
  )
}
