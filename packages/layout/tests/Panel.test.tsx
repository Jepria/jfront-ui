import { render } from "@testing-library/react"
import React from "react"
import { Panel } from "../src"

test("Checking for the existence of an element Tab", () => {
  render(
    <>
      <Panel>
        <Panel.Header
          style={{ backgroundColor: "yellow", minHeight: "30px" }}
        />
        <Panel.Content style={{ backgroundColor: "red" }} />
        <Panel.Footer style={{ backgroundColor: "blue", minHeight: "30px" }} />
      </Panel>
    </>,
  )
})
