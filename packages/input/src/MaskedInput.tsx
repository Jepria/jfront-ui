import React from "react"
import MaskedInput, { maskArray, conformToMask } from "react-text-mask"
import { TextInput } from "./TextInput"
import { InputProps } from "."

const defaultFormatChars = {
  "9": /[0-9]/,
  a: /[a-z]/,
  A: /[A-Z]/,
  "*": /[A-Za-z0-9]/,
}

export const parseMask = (mask: string): maskArray => {
  const chars: string[] = Array.from(mask)

  const result: Array<string | RegExp> = []
  let isPermanent = false
  chars.forEach((char) => {
    if (!isPermanent && char === "\\") {
      isPermanent = true
    } else {
      if (isPermanent || !defaultFormatChars[char]) {
        isPermanent = false
        result.push(char)
      } else {
        result.push(defaultFormatChars[char])
      }
    }
  })

  return result
}

export const parsePlaceholderFromString = (
  mask: string,
  placeholderChar = "*",
): string => {
  const chars: string[] = Array.from(mask)

  const result: Array<string> = []
  let isPermanent = false
  chars.forEach((char) => {
    if (!isPermanent && char === "\\") {
      isPermanent = true
    } else {
      if (isPermanent || !defaultFormatChars[char]) {
        isPermanent = false
        result.push(char)
      } else {
        result.push(placeholderChar)
      }
    }
  })
  return result.join("")
}

export const parsePlaceholderFromArray = (
  mask: Array<string | RegExp>,
  placeholderChar = "*",
): string => {
  const result: Array<string> = []
  mask.forEach((char) => {
    if (typeof char === "string") {
      result.push(char)
    } else {
      result.push(placeholderChar)
    }
  })
  return result.join("")
}

export interface MaskedTextInputProps
  extends InputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  mask: string | Array<string | RegExp>

  guide?: boolean

  placeholderChar?: string

  keepCharPositions?: boolean

  pipe?: (
    conformedValue: string,
    config: any,
  ) => false | string | { value: string; indexesOfPipedChars: number[] }

  showMask?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MaskedTextInput = React.forwardRef<
  HTMLInputElement,
  MaskedTextInputProps
>(({ name = "", onChange, ...props }, ref) => {
  const maskOptions = React.useMemo(
    () => ({
      mask: typeof props.mask === "string" ? parseMask(props.mask) : props.mask,
      placeholder:
        typeof props.mask === "string"
          ? parsePlaceholderFromString(props.mask, props.placeholderChar)
          : parsePlaceholderFromArray(props.mask, props.placeholderChar),
    }),
    [props.mask, props.placeholderChar],
  )

  return (
    <MaskedInput
      placeholderChar={"*"}
      ref={(inputRef) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(inputRef?.inputElement as HTMLInputElement)
          } else {
            ref.current = inputRef?.inputElement
              ? (inputRef?.inputElement as HTMLInputElement)
              : null
          }
        }
      }}
      {...props}
      onChange={(e) => {
        if (onChange) {
          if (e.target.value === maskOptions.placeholder) {
            e.target.value = ""
            onChange(e)
          } else if (
            onChange &&
            !conformToMask(e.target.value, maskOptions.mask, {}).meta
              .someCharsRejected
          ) {
            onChange(e)
          }
        }
      }}
      mask={maskOptions.mask}
      render={(innerRef, props) => <TextInput ref={innerRef} {...props} />}
    />
  )
})
