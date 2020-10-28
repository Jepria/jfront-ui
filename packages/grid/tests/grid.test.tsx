import { render } from "@testing-library/react"
import React from "react"
import { Grid } from "../src"

test("Checking for the existence of an element Grid", () => {
  render(
    <Grid
      id="test"
      columns={[
        { Header: "Id", accessor: "id" },
        { Header: "Name", accessor: "name" },
        { Header: "Info", accessor: "info" },
      ]}
      data={[{ id: 1, name: "123", info: "test" }]}
    />,
  )
})
