import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { TextArea } from "../src"

const vtextValue = "tets"
test("Checking for the existence of an element Tab", () => {
  render(
    <TextArea name="TextAreaName" value={vtextValue}>
      Test
    </TextArea>,
  )
})

test.skip("Matches snapshot ", () => {
  const { asFragment } = render(
    <TextArea name="TextAreaName" value={vtextValue}>
      Test
    </TextArea>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test.skip("isLoading display TextArea ", () => {
  const { asFragment } = render(
    <>
      <TextArea name="TextAreaNameLoading" isLoading value={vtextValue}>
        Текст при загрузке
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test.skip("error display TextArea", () => {
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

test.skip("resize display TextArea ", () => {
  const { asFragment } = render(
    <>
      <TextArea name="TextAreaNameResize" resize="both" value={vtextValue}>
        Изменение размера по горизонтали и вертикали
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test.skip("resize horizontal display TextArea", () => {
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

test.skip("resize horizontal display TextArea", () => {
  const { asFragment } = render(
    <>
      <TextArea name="TextAreaNameResize" resize="resize" value={vtextValue}>
        Изменение размера по вертикали
      </TextArea>
    </>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Entering a value in TextArea", () => {
  let inputText
  render(
    <TextArea
      name="TextAreaName"
      onChange={(event) => {
        inputText = event.target.value
      }}
      value={vtextValue}
    >
      Test
    </TextArea>,
  )
  const input = screen.getAllByRole("textbox")[0]
  fireEvent.focus(input)
  fireEvent.change(input, { target: { value: "214312412412" } })

  expect(inputText).toEqual("214312412412")
})
