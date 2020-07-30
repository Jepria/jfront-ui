import * as React from 'react'
import { Toolbar } from '../src/Toolbar'

export default {
  title: 'Toolbar',
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <Toolbar
      />
    </>
  )
}
