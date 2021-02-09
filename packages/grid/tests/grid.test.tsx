import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
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

test("Checking clicking on one of the grid elements", () => {
  let record
  render(
    <Grid
      id="test"
      columns={[
        { Header: "Id", accessor: "id" },
        { Header: "Name", accessor: "name" },
        { Header: "Info", accessor: "info" },
      ]}
      data={[
        { id: 1, name: "Rook", info: "Rook" },
        { id: 2, name: "Pop", info: "Pop" },
        { id: 3, name: "Jaz", info: "Jaz" },
        { id: 4, name: "Gachi", info: "Gachi" },
      ]}
      onSelection={(records) => {
        record = records
      }}
    />,
  )
  const input = screen.getAllByTitle("Rook")[0]
  fireEvent.click(input)
  expect(record).toEqual([{ id: 1, name: "Rook", info: "Rook" }])
})

test.skip("Matches snapshot ", () => {
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

test.skip("Grid colors block renders correctly", () => {
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
