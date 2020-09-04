import * as React from "react"
import { DatePicker } from "@jfront/ui-core"
import { PagingToolBar } from "@jfront/ui-pagingbar"
import { InputText } from "@jfront/ui-input"
import { TabPanel } from "@jfront/ui-tabpanel"
import { Toolbar } from "@jfront/ui-toolbar"
import { Form } from "@jfront/ui-form"

function App() {
  const onChange = () => {
    console.log("onChange()")
  }
  return (
    <div>
      <DatePicker onChange={onChange} />
      <PagingToolBar pageCount={2} />
      <InputText name="InputTextName" />
      <TabPanel />
      <Toolbar />
      <Form />
    </div>
  )
}

export default App
