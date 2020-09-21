import * as React from "react"
import {
  Grid,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView,
  ToolbarSplitter,
} from "@jfront/ui-core"
import { TabPanel, Tab } from "@jfront/ui-tabpanel"
import { Toolbar } from "@jfront/ui-toolbar"
import namor from "namor"

function App() {
  interface Data {
    id: number
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: string
  }

  const makeData = (length: number) => {
    const arr: Array<Data> = []
    for (let i = 0; i < length; i++) {
      const statusChance = Math.random()
      arr.push({
        id: i + 1,
        firstName: namor.generate({ words: 1, numbers: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
          statusChance > 0.66
            ? "relationship"
            : statusChance > 0.33
            ? "complicated"
            : "single",
      })
    }
    return arr
  }

  const data: Array<Data> = makeData(100)

  return (
    <div>
      <TabPanel>
        <Tab selected={true}>Showcase App</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate />
        <ToolbarButtonSave />
        <ToolbarButtonEdit />
        <ToolbarButtonDelete />
        <ToolbarButtonView />
        <ToolbarSplitter />
        <ToolbarButtonBase>Список</ToolbarButtonBase>
        <ToolbarButtonFind />
        <ToolbarButtonBase>Найти</ToolbarButtonBase>
      </Toolbar>
      <Grid<Data>
        columns={[
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "First Name",
            accessor: "firstName",
            width: 300,
          },
          {
            Header: "Last Name",
            accessor: "lastName",
            width: 300,
          },

          {
            Header: "Age",
            accessor: "age",
            width: 300,
          },
          {
            Header: "Visits",
            accessor: "visits",
            width: 300,
          },
          {
            Header: "Status",
            accessor: "status",
            width: 300,
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
            width: 300,
          },
        ]}
        data={React.useMemo(() => data, [])}
      />
    </div>
  )
}

export default App
