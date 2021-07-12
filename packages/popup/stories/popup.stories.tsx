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

const CustomPopup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        backgroundColor: "red",
        color: "yellow",
        position: "absolute",
      }}
      ref={ref}
    >
      {props.children}
    </div>
  )
})

export const CustomComponent = () => {
  const [visible, setVisible] = React.useState(false)
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

export const TopPlacement = () => {
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
        targetRelativePosition={{ vertical: "top", horizontal: "left" }}
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

export const ScrollFlip = () => {
  const [visible, setVisible] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: "800px", paddingTop: "300px" }}>
        <button
          ref={buttonRef}
          style={{ margin: "50px" }}
          onClick={() => setVisible(!visible)}
        >
          Show
        </button>
        <Popup
          style={{ height: "100px" }}
          flippingEnabled
          onFlip={console.log}
          visible={visible}
          targetElementRef={buttonRef}
          targetRelativePosition={{ vertical: "top", horizontal: "left" }}
          onOpen={() => console.log("open")}
          onClose={() => {
            setVisible(false)
            console.log("close")
          }}
        >
          <p>This is popup</p>
        </Popup>
      </div>
    </div>
  )
}

export const ScrollFlipDisablePortal = () => {
  const [visible, setVisible] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: "800px", paddingTop: "300px" }}>
        <button
          ref={buttonRef}
          style={{ margin: "50px" }}
          onClick={() => setVisible(!visible)}
        >
          Show
        </button>
        <Popup
          flippingEnabled
          onFlip={console.log}
          disablePortal
          visible={visible}
          targetElementRef={buttonRef}
          targetRelativePosition={{ vertical: "top", horizontal: "left" }}
          onOpen={() => console.log("open")}
          onClose={() => {
            setVisible(false)
            console.log("close")
          }}
        >
          <p>This is popup</p>
        </Popup>
      </div>
    </div>
  )
}
