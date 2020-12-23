import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { FileUpload } from "../src"

test("Matches snapshot ", () => {
  render(<FileUpload />)
  expect(document.body).toMatchSnapshot()
})

test("FileUpload render test", () => {
  render(<FileUpload data-testid="test" label="Choose file" />)
  expect(screen.getByText("Choose file")).toBeInTheDocument()
  expect(screen.getByTestId("test")).toBeInTheDocument()
  expect(screen.queryByRole("list")).not.toBeInTheDocument()
})

const FileUploadTest = (props: {accept?: string}) => {
  const [values, setValues] = React.useState(undefined);

  return (
    <FileUpload {...props} data-testid="test" label="Choose file" value={values} onChange={(name, value) => setValues(value)}/>
  )
}

test("FileUpload behavior", () => {
  render(<FileUploadTest/>)
  const file = new File([new ArrayBuffer(1)], "file.jpg")

  const input = screen.getByTestId("test")
  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { files: [file] } })

  expect(screen.getByRole("list")).toBeInTheDocument()
  expect(screen.getByText("file.jpg")).toBeInTheDocument()
  const deleteButton = screen.getAllByRole("button")
  expect(deleteButton.length).toBe(2)
  fireEvent.click(deleteButton[1])
  expect(screen.queryByRole("list")).not.toBeInTheDocument()
})

test("FileUpload drag'n'drop behavior", () => {
  render(<FileUploadTest/>)
  const file = new File([new ArrayBuffer(1)], "file.jpg")

  const dropZone = screen.getByText("Choose file");
  expect(dropZone).toBeInTheDocument();

  fireEvent.drop(dropZone, { dataTransfer: { files: [file] } })

  expect(screen.getByRole("list")).toBeInTheDocument()
  expect(screen.getByText("file.jpg")).toBeInTheDocument()
  const deleteButton = screen.getAllByRole("button")
  expect(deleteButton.length).toBe(2)
  fireEvent.click(deleteButton[1])
  expect(screen.queryByRole("list")).not.toBeInTheDocument()
})

test("FileUpload behavior wrong mimetype", () => {
  render(<FileUploadTest accept=".txt"/>)
  const file = new File([new ArrayBuffer(1)], "file.jpg")

  const dropZone = screen.getByText("Choose file");
  expect(dropZone).toBeInTheDocument();
  fireEvent.drop(dropZone, { dataTransfer: { files: [file] } })

  expect(screen.queryByRole("list")).not.toBeInTheDocument()
})
