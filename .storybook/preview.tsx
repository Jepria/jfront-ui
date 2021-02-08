import { addDecorator } from "@storybook/react"
import { withA11y } from "@storybook/addon-a11y"

addDecorator((storyFn) => storyFn())
addDecorator(withA11y)
