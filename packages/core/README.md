# Welcome to JFront UI ⚡️

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

- Works out of the box. JFront UI contains a set of polished React components
  that work out of the box.

- Flexible & composable. JFront UI components are built on top of a React UI
  Primitive for endless composability.

- Accessible. JFront UI components follows the WAI-ARIA guidelines
  specifications.

- Dark Mode 😍: All components are dark mode compatible.

## Looking for the documentation?

## Installing 

⚡JFront UI is made up of multiple components and tools which you can import
one by one. All you need to do is install the `@jfront-ui/core` package:

```sh
$ yarn add @JFront-ui/core
# or
$ npm install --save @JFront-ui/core
```

# Getting set up

To start using the components, please follow these steps:

1. Wrap your application in a `ThemeProvider` provided by **@JFront-ui/core**

```jsx
import { ThemeProvider, ColorModeProvider } from "@jfront-ui/core"

const App = ({ children }) => (
  <ThemeProvider>
    <ColorModeProvider>{children}</ColorModeProvider>
  </ThemeProvider>
)
```

`ColorModeProvider` is a context that provides light mode and dark mode values
to the components. It also comes with a function to toggle between light/dark
mode.

2. Now you can start using components like so!:

```jsx
import { Button } from "@jfront-ui/core"

const App = () => <Button>I just consumed some ⚡JFront!</Button>
```

# Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](../../CONTRIBUTING.md) to help guide you.

The components to be built come from the
[Aria Practices Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1).

## Contributors ✨


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>

  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
