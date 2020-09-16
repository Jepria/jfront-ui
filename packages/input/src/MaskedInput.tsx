import React from "react"
import InputMask, { Props } from "react-input-mask"
import { TextInput } from "./TextInput"
import { InputProps } from "."

interface MaskPlaceholder {
  maskPlaceholder?: string
}

export const MaskedTextInput = React.forwardRef<
  HTMLInputElement,
  Props & InputProps & MaskPlaceholder
>((props, ref) => {
  return (
    <InputMask {...props} inputRef={ref}>
      <TextInput autoComplete="off" />
    </InputMask>
  )
})
