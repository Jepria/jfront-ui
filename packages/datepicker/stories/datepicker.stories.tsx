import * as React from "react"
import { DatePicker } from "../src"

export default {
  title: "DatePicker",
  decorators: [
    (StoryFn: Function) => (
      <div style={{ padding: "5px" }}>
        <StoryFn />
      </div>
    ),
  ],
}

export const BasicUsage = () => {
  const onChange = (value: Date) => {
    console.log("onChange()")
    setDate(value)
  }

  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <>
      <DatePicker selected={date} label="Date" onChange={onChange} />
    </>
  )
}

export const Error = () => {
  const onChange = (value: Date) => {
    console.log("onChange()")
    setDate(value)
  }

  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <>
      <DatePicker selected={date} onChange={onChange} error="Wrong value" />
    </>
  )
}

export const IsLoading = () => {
  const onChange = (value: Date) => {
    console.log("onChange()")
    setDate(value)
  }

  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <>
      <DatePicker selected={date} onChange={onChange} isLoading />
    </>
  )
}
