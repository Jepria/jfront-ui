import * as React from "react"
import { Popup } from "../src"

export default {
  title: "Popup",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  const [visible, setVisible] = React.useState(true)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const test = React.useRef<HTMLElement>(null)

  return (
    <>
      <button
        ref={buttonRef}
        style={{ margin: "50px" }}
        onClick={() => setVisible(!visible)}
      >
        Show
      </button>
      <Popup
        visible={visible}
        targetElementRef={buttonRef}
        targetRelativePosition={{ horizontal: "left", vertical: "bottom" }}
        onOpen={() => console.log("open")}
        onClose={() => {
          setVisible(false)
          console.log("close")
        }}
        ref={test}
      >
        <p>This is popup</p>
      </Popup>
    </>
  )
}

interface CustomProps extends React.HTMLAttributes<HTMLDivElement> {
  alertText: string
}

const CustomPopup = React.forwardRef<HTMLDivElement, CustomProps>(
  (props: CustomProps, ref) => {
    return (
      <div
        {...props}
        style={{ ...props.style, backgroundColor: "red", color: "yellow" }}
        ref={ref}
        onClick={() => window.alert(props.alertText)}
      >
        {props.children}
      </div>
    )
  },
)

export const CustomComponent = () => {
  const [visible, setVisible] = React.useState(true)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const test = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <button
        ref={buttonRef}
        style={{ margin: "50px" }}
        onClick={() => setVisible(!visible)}
      >
        Show
      </button>
      <Popup
        as={CustomPopup}
        visible={visible}
        targetElementRef={buttonRef}
        targetRelativePosition={{ horizontal: "left", vertical: "bottom" }}
        onOpen={() => console.log("open")}
        onClose={() => {
          setVisible(false)
          console.log("close")
        }}
        alertText="alert"
        ref={test}
      >
        <p>This is popup</p>
      </Popup>
    </>
  )
}
