import React from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from "date-fns/locale"
import {
  InputProps,
  parsePlaceholderFromString,
  MaskedTextInput,
} from "@jfront/ui-input"
import { toIsoDateString } from "@jfront/ui-utils"

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
  Omit<ReactDatePickerProps, "selected" | "onChange"> &
    InputProps & {
      selected?: string | Date | null
      isoDateString?: boolean
      onChange(
        date: Date | [Date, Date] | null | string,
        event: React.SyntheticEvent<any> | undefined,
      ): void
    }
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
      selected,
      isoDateString,
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
        selected={typeof selected === "string" ? new Date(selected) : selected}
        peekNextMonth={peekNextMonth}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        dropdownMode={dropdownMode}
        dateFormat={dateFormat}
        autoComplete={autoComplete}
        onChange={(date, event) => {
          if (isoDateString) {
            onChange(toIsoDateString(date as Date), event)
          } else {
            onChange(date, event)
          }
        }}
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
