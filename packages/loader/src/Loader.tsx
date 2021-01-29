import React from "react"
import {
  GlassMask,
  MaskPanel,
  InlineBlock,
  Header,
  Text,
  Image,
} from "./styles"

export interface Loader {
  header?: string
  text?: string
}

export const Loader: React.FC<Loader> = ({ header, text }) => {
  return (
    <React.Fragment>
      <GlassMask />
      <MaskPanel>
        <Image />
        <InlineBlock>
          <Header>{header}</Header>
          <Text>{text}</Text>
        </InlineBlock>
      </MaskPanel>
    </React.Fragment>
  )
}
