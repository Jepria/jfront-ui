import * as React from "react"
import { TextArea } from "../src/TextArea"
import { Label } from "@jfront/ui-label"

export default {
  title: "TextArea",
  decorators: [
    (StoryFn: Function) => (
      <div style={{ padding: "5px" }}>
        <StoryFn />
      </div>
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <TextArea name="TextAreaName" />
    </>
  )
}

export const IsLoading = () => {
  return (
    <>
      <TextArea name="TextAreaNameLoading" isLoading>
        Текст при загрузке
      </TextArea>
    </>
  )
}

export const Error = () => {
  return (
    <>
      <TextArea name="TextAreaNameLoading" error="Ahtung! Wrong value">
        Текст при ошибке
      </TextArea>
    </>
  )
}

export const NoResizable = () => {
  return (
    <>
      <TextArea name="TextAreaNameLoading" error="Ahtung! Wrong value">
        Текст при ошибке
      </TextArea>
    </>
  )
}
