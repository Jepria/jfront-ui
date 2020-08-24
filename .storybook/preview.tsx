import { addDecorator } from "@storybook/react"
import * as React from "react"
import { withPerformance } from "storybook-addon-performance"
import { withA11y } from "@storybook/addon-a11y"

addDecorator((storyFn) => <div>{storyFn()}</div>)
addDecorator(withPerformance)
addDecorator(withA11y)
