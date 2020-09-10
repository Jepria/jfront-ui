import { render } from "@testing-library/react"
import React from "react"
import {
  HorizontalLayout,
  VerticalLayout,
  Content,
  Footer,
  FormContainer,
  Header,
  Page,
} from "../src"

test("Checking for the existence of an element Layouts", () => {
  expect(render(<HorizontalLayout />))
  expect(render(<VerticalLayout />))
  expect(render(<Content />))
  expect(render(<Footer />))
  expect(render(<FormContainer />))
  expect(render(<Header />))
  expect(render(<Page />))
})
