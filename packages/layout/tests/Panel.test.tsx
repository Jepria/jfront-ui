import { render } from "@testing-library/react"
import React from "react"
import { Column, Panel, Row } from "../src"

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

test("Matches snapshot ", () => {
  const { asFragment } = render(
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
  expect(asFragment()).toMatchSnapshot()
})
test("PanelWithLeftSide snapshot ", () => {
  const { asFragment } = render(
    <>
      <Panel>
        <Panel.Content>
          <Row style={{ height: "100%" }}>
            <Column style={{ flexGrow: 1, backgroundColor: "green" }}>
              <Panel />
            </Column>
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
          </Row>
        </Panel.Content>
      </Panel>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
