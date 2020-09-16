import * as React from "react"
import {Form, FormField} from "../src";

export default {
  title: "Form",
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const EmptyForm = () => {
  return (
    <>
      <Form
      />
    </>
  )
}
