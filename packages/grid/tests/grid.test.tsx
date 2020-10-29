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
test("Matches snapshot ", () => {
  const { asFragment } = render(
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
  expect(asFragment()).toMatchSnapshot()
})

test("Grid colors block renders correctly", () => {
  const { asFragment } = render(
    <Grid
      id="test"
      columns={[
        { Header: "Id", accessor: "id" },
        { Header: "Name", accessor: "name" },
        { Header: "Info", accessor: "info" },
      ]}
      data={[
        { id: 1, name: "123", info: "test" },
        { id: 1, name: "121", info: "test2" },
        { id: 1, name: "14", info: "test3" },
      ]}
      getRowProps={(row) => ({
        style: { backgroundColor: "rgb(255, 95, 87)" },
      })}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})
