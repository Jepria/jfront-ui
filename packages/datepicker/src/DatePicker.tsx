import React from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from "date-fns/locale"
import {
  InputProps,
  parsePlaceholderFromString,
  MaskedTextInput,
} from "@jfront/ui-input"

export const dateFormatToMask = (dateFormat: string | string[]) => {
  if (Array.isArray(dateFormat)) {
    return dateFormat
      .map((format) => format.replace(/[mMdDyYhH]/g, "9"))
      .join("")
  } else {
    return dateFormat.replace(/[mMdDyYhH]/g, "9")
  }
}

export const DatePicker = React.forwardRef<
  ReactDatePicker,
  ReactDatePickerProps & InputProps
>(
  (
    {
      onChange,
      onSelect,
      peekNextMonth = true,
      showMonthDropdown = true,
      showYearDropdown = true,
      dropdownMode = "select",
      dateFormat = "dd.MM.yyyy",
      autoComplete = "off",
      locale = ru,
      ...props
    },
    ref,
  ) => {
    return (
      <ReactDatePicker
        {...props}
        customInput={
          <MaskedTextInput
            {...props}
            mask={dateFormatToMask(dateFormat)}
            returnAllValues
          />
        }
        peekNextMonth={peekNextMonth}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        dropdownMode={dropdownMode}
        dateFormat={dateFormat}
        autoComplete={autoComplete}
        onChange={onChange}
        onSelect={onSelect}
        locale={locale}
        isClearable={!props.error && !props.isLoading}
        placeholderText={parsePlaceholderFromString(
          dateFormatToMask(dateFormat),
        )}
        ref={ref}
      />
    )
  },
)
