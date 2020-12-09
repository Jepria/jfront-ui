import * as React from "react"
import { Link } from "../src"

export default {
  title: "Link",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <pre>
      It is text <Link href="/test">Link</Link>
    </pre>
  )
}

export const Redirect = () => {
  return (
    <pre>
      It is text{" "}
      <Link href="/test" method="redirect">
        Link
      </Link>
    </pre>
  )
}
