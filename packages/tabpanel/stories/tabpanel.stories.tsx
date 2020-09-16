import * as React from 'react'
import { TabPanel } from '../src/TabPanel'

export default {
  title: 'TabPanel',
  decorators: [
    (StoryFn: Function) => (
    <StoryFn />
    ),
  ],
}

export const BasicUsage = () => {
  return (
    <>
      <TabPanel
      />
    </>
  )
}
