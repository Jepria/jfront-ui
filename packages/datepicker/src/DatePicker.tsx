import React from "react";
import ReactDatePicker, {ReactDatePickerProps} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ru} from "date-fns/locale";

interface DatePickerInterface extends ReactDatePickerProps {
}

export const DatePicker: React.FC<DatePickerInterface> = (
    {
      peekNextMonth = true,
      showMonthDropdown = true,
      showYearDropdown = true,
      dropdownMode = "select",
      dateFormat = "yyyy-MM-dd",
      autoComplete = "off",
      locale = ru,
      name,
      onChange,
      selected
    }) => {

  return (
      <ReactDatePicker
          name={name}
          selected={selected}
          onChange={onChange}
          peekNextMonth={peekNextMonth}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          dropdownMode={dropdownMode}
          dateFormat={dateFormat}
          autoComplete={autoComplete}
          locale={locale}
      />
  )
}