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
      <TextArea name="TextAreaNameError" error="Ahtung! Wrong value">
        Текст при ошибке
      </TextArea>
    </>
  )
}

export const BothResizable = () => {
  return (
    <>
      <TextArea name="TextAreaNameResize" resize="both">
        Изменение размера по горизонтали и вертикали
      </TextArea>
    </>
  )
}

export const HorizontalResizable = () => {
  return (
    <>
      <TextArea name="TextAreaNameResize" resize="horizontal">
        Изменение размера по горизонтали
      </TextArea>
    </>
  )
}

export const VerticalResizable = () => {
  return (
    <>
      <TextArea name="TextAreaNameResize" resize="vertical">
        Изменение размера по вертикали
      </TextArea>
    </>
  )
}
