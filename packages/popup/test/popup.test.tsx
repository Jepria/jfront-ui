import React from "react"
import { render } from "react-dom"
import { Popup } from "../src"
import { Link } from "@jfront/ui-link"
import { fireEvent, screen } from "@testing-library/react"

const container = document.createElement("div")
document.body.appendChild(container)

const TestComponent = () => {
  const [visible, setVisible] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <button
        data-testid="button"
        ref={buttonRef}
        onClick={() => setVisible(!visible)}
      >
        Show
      </button>
      <Popup
        visible={visible}
        targetElementRef={buttonRef}
        targetRelativePosition={{ horizontal: "left", vertical: "bottom" }}
        onClose={() => {
          setVisible(false)
        }}
      >
        <p data-testid="content">This is popup</p>
      </Popup>
    </>
  )
}

test("Matches snapshot", () => {
  render(<TestComponent />, container)
  expect(document.body).toMatchSnapshot()
})

test("popup click", () => {
  render(<TestComponent />, container)
  fireEvent.click(screen.getByTestId("button"))
  expect(screen.getByTestId("content").innerHTML).toEqual("This is popup")
})
