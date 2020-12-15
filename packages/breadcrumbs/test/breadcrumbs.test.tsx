import React from "react"
import { render } from "react-dom"
import { Breadcrumbs } from "../src"
import { Link } from "@jfront/ui-link"
import { fireEvent, screen } from "@testing-library/react"

const container = document.createElement("div")
document.body.appendChild(container)

test("Matches snapshot 1", () => {
  render(
    <Breadcrumbs>
      <Link href="/test1">Test Link1</Link>
      <Link href="/test2">Test Link2</Link>
      <Link href="/test3">Test Link3</Link>
    </Breadcrumbs>,
    container,
  )
  expect(document.body).toMatchSnapshot()
})

test("Matches snapshot 2", () => {
  render(
    <Breadcrumbs>
      <Link href="/test1">Test Link1</Link>
      <Link href="/test2">Test Link2</Link>
      <Link href="/test3">Test Link3</Link>
      <Link href="/test4">Test Link4</Link>
      <Link href="/test5">Test Link5</Link>
    </Breadcrumbs>,
    container,
  )
  expect(document.body).toMatchSnapshot()
})

test("expand click", () => {
  render(
    <Breadcrumbs data-testid="breadcrumbs">
      <Link href="/test1">Test Link1</Link>
      <Link href="/test2">Test Link2</Link>
      <Link data-testid="a" href="/test3">
        Test Link3
      </Link>
      <Link href="/test4">Test Link4</Link>
      <Link>Test Link5</Link>
    </Breadcrumbs>,
    container,
  )
  fireEvent.click(screen.getByRole("button"))
  fireEvent.click(screen.getByTestId("a"))
  expect(window.location.pathname).toEqual("/test3")
})

test("popup click", () => {
  render(
    <Breadcrumbs data-testid="breadcrumbs" collapseMethod="dropdown">
      <Link href="/test1">Test Link1</Link>
      <Link href="/test2">Test Link2</Link>
      <Link data-testid="a" href="/test3">
        Test Link3
      </Link>
      <Link href="/test4">Test Link4</Link>
      <Link>Test Link5</Link>
    </Breadcrumbs>,
    container,
  )
  fireEvent.click(screen.getByRole("button"))
  fireEvent.click(screen.getByTestId("a"))
  expect(window.location.pathname).toEqual("/test3")
})
