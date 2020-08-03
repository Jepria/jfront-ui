import * as React from "react"
import { DatePicker } from "@jfront-ui/core"

function App() {
  const onChange = () => {console.log('onChange()')}
  return (
    <div>
      <DatePicker
        onChange = {onChange}
      />
    </div>
  )
}

export default App
