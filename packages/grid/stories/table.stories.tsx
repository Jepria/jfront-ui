import React from "react"
import { Grid } from "../src"

export default {
  title: "Grid",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

interface Data {
  name: string
  middleName: string
}

export const BasicUsage = () => {
  return (
    <Grid<Data>
      columns={[
        { Header: "Name", accessor: "name" },
        { Header: "Middle name", accessor: "middleName" },
      ]}
      data={[
        { name: "test", middleName: "shit" },
        { name: "test1", middleName: "shit2" },
        { name: "test2", middleName: "shit3" },
        { name: "test3", middleName: "shit4" },
        { name: "test4", middleName: "shit5" },
      ]}
    />
  )
}
