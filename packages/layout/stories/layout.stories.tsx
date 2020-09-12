import * as React from "react"
import { Row, Column } from "../src/Layout"
import { Panel } from "../src/Panel"

export default {
  title: "Layout",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicLayout = () => {
  return (
    <>
      <Column>
        <Row style={{ height: "60px" }}>
          <Column style={{ backgroundColor: "red", flexGrow: 1 }}></Column>
        </Row>
        <Row style={{ height: "60px" }}>
          <Column style={{ backgroundColor: "green", flexGrow: 1 }} />
          <Column style={{ backgroundColor: "blue", flexGrow: 1 }} />
        </Row>
        <Row style={{ height: "60px" }}>
          <Column style={{ backgroundColor: "yellow", flexGrow: 1 }} />
          <Column style={{ backgroundColor: "aqua", flexGrow: 1 }} />
          <Column style={{ backgroundColor: "purple", flexGrow: 1 }} />
        </Row>
      </Column>
    </>
  )
}

export const BasicPanel = () => {
  return (
    <>
      <Panel>
        <Panel.Header
          style={{ backgroundColor: "yellow", minHeight: "30px" }}
        />
        <Panel.Content style={{ backgroundColor: "red" }} />
        <Panel.Footer style={{ backgroundColor: "blue", minHeight: "30px" }} />
      </Panel>
    </>
  )
}

export const PanelWithLeftSide = () => {
  return (
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
    </>
  )
}
