import * as React from "react"
import { DatePicker } from "@jfront-ui/core"
import {PagingToolBar} from "@jfront-ui/pagingbar";

function App() {
  const onChange = () => {console.log('onChange()')}
  return (
    <div>
      <DatePicker
        onChange = {onChange}
      />
      <PagingToolBar
        pageCount={2}/>
    </div>
  )
}

export default App
