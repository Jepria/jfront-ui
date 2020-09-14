import React from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from "date-fns/locale"
import { Label } from "@jfront/ui-label"
import { MaskedTextInput, InputProps } from "@jfront/ui-input"

export const dateFormatToMask = (dateFormat: string | string[]) => {
  if (Array.isArray(dateFormat)) {
    return dateFormat.map((format) => format.replaceAll(/[mMdDyYhH]/g, "9"))
  } else {
    return dateFormat.replaceAll(/[mMdDyYhH]/g, "9")
  }
}

export const DatePicker = React.forwardRef<
  HTMLInputElement,
  ReactDatePickerProps & InputProps
>((props, ref) => {
  const {
    peekNextMonth = true,
    showMonthDropdown = true,
    showYearDropdown = true,
    dropdownMode = "select",
    dateFormat = "yyyy-MM-dd",
    autoComplete = "off",
    locale = ru,
    customInput = (
      <MaskedTextInput
        mask={dateFormatToMask(dateFormat)}
        maskPlaceholder="*"
        error={props.error}
        isLoading={props.isLoading}
        alwaysShowMask
        ref={ref}
      />
    ),
  } = props

  return (
    <ReactDatePicker
      {...props}
      customInput={customInput}
      peekNextMonth={peekNextMonth}
      showMonthDropdown={showMonthDropdown}
      showYearDropdown={showYearDropdown}
      dropdownMode={dropdownMode}
      dateFormat={dateFormat}
      autoComplete={autoComplete}
      locale={locale}
    />
  )
})
