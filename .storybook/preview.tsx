import { addDecorator } from "@storybook/react"
import { withPerformance } from "storybook-addon-performance"
import { withA11y } from "@storybook/addon-a11y"

addDecorator((storyFn) => storyFn())
addDecorator(withPerformance)
addDecorator(withA11y)
