import React from "react"
import { render } from "@testing-library/react"
import { TextArea } from "../src"

const vtextValue = "tets"
test("Checking for the existence of an element Tab", () => {
  render(
    <TextArea name="TextAreaName" value={vtextValue}>
      Test
    </TextArea>,
  )
})

test("Matches snapshot ", () => {
  const { asFragment } = render(
    <TextArea name="TextAreaName" value={vtextValue}>
      Test
    </TextArea>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("isLoading display TextArea ", () => {
  const { asFragment } = render(
    <>
      <TextArea name="TextAreaNameLoading" isLoading value={vtextValue}>
        Текст при загрузке
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("error display TextArea", () => {
  const { asFragment } = render(
    <>
      <TextArea
        name="TextAreaNameError"
        error="Ahtung! Wrong value"
        value={vtextValue}
      >
        Текст при ошибке
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("resize display TextArea ", () => {
  const { asFragment } = render(
    <>
      <TextArea name="TextAreaNameResize" resize="both" value={vtextValue}>
        Изменение размера по горизонтали и вертикали
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("resize horizontal display TextArea", () => {
  const { asFragment } = render(
    <>
      <TextArea
        name="TextAreaNameResize"
        resize="horizontal"
        value={vtextValue}
      >
        Изменение размера по горизонтали
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
test("resize horizontal display TextArea", () => {
  const { asFragment } = render(
    <>
      <TextArea name="TextAreaNameResize" resize="resize" value={vtextValue}>
        Изменение размера по вертикали
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})
