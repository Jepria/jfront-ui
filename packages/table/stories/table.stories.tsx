import React from "react"
import { Table } from "../src"

export default {
  title: "Table",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <Table>
        <Table.Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>header1</Table.HeaderCell>
              <Table.HeaderCell>header2</Table.HeaderCell>
              <Table.HeaderCell>header3</Table.HeaderCell>
              <Table.HeaderCell>header4</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell label="Row1">Cell1</Table.Cell>
              <Table.Cell label="Row1">Cell2</Table.Cell>
              <Table.Cell label="Row1">Cell3</Table.Cell>
              <Table.Cell label="Row1">Cell4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell label="Row2">Cell1</Table.Cell>
              <Table.Cell label="Row2">Cell2</Table.Cell>
              <Table.Cell label="Row2">Cell3</Table.Cell>
              <Table.Cell label="Row2">Cell4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell label="Row3">Cell1</Table.Cell>
              <Table.Cell label="Row3">Cell2</Table.Cell>
              <Table.Cell label="Row3">Cell3</Table.Cell>
              <Table.Cell label="Row3">Cell4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell label="Row4">Cell1</Table.Cell>
              <Table.Cell label="Row4">Cell2</Table.Cell>
              <Table.Cell label="Row4">Cell3</Table.Cell>
              <Table.Cell label="Row4">Cell4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell label="Row5">Cell1</Table.Cell>
              <Table.Cell label="Row5">Cell2</Table.Cell>
              <Table.Cell label="Row5">Cell3</Table.Cell>
              <Table.Cell label="Row5">Cell4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell label="Row6">Cell1</Table.Cell>
              <Table.Cell label="Row6">Cell2</Table.Cell>
              <Table.Cell label="Row6">Cell3</Table.Cell>
              <Table.Cell label="Row6">Cell4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell label="Row7">Cell1</Table.Cell>
              <Table.Cell label="Row7">Cell2</Table.Cell>
              <Table.Cell label="Row7">Cell3</Table.Cell>
              <Table.Cell label="Row7">Cell4</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Table>
      </Table>
    </>
  )
}

export const PagingBar = () => {
  return (
    <>
      <Table>
        <Table.Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>header1</Table.HeaderCell>
              <Table.HeaderCell>header2</Table.HeaderCell>
              <Table.HeaderCell>header3</Table.HeaderCell>
              <Table.HeaderCell>header4</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
              <Table.Cell>Row1</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
              <Table.Cell>Row2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
              <Table.Cell>Row3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
              <Table.Cell>Row4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
              <Table.Cell>Row5</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
              <Table.Cell>Row6</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Table>
        <Table.PagingBar rowCount={6} totalRowCount={6} />
      </Table>
    </>
  )
}
