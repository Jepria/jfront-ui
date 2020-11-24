import React from "react"
import { render } from "@testing-library/react"
import { Column, Panel, Row } from "../src"

test("Checking for the existence of an element Tab", () => {
  render(
    <>
      <Column style={{ flexGrow: 3 }}>
        <Panel>
          <Panel.Header
            style={{ backgroundColor: "yellow", minHeight: "30px" }}
          />
          <Panel.Content style={{ backgroundColor: "red" }} />
          <Panel.Footer
            style={{ backgroundColor: "blue", minHeight: "30px" }}
          />
        </Panel>
      </Column>
    </>,
  )
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <>
      <Column style={{ flexGrow: 3 }}>
        <Panel>
          <Panel.Header
            style={{ backgroundColor: "yellow", minHeight: "30px" }}
          />
          <Panel.Content style={{ backgroundColor: "red" }} />
          <Panel.Footer
            style={{ backgroundColor: "blue", minHeight: "30px" }}
          />
        </Panel>
      </Column>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
