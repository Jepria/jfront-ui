import React from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import styled from "styled-components"

export const StyledDatePicker = styled(
  ({ className, ...props }: ReactDatePickerProps) => (
    <ReactDatePicker
      {...props}
      wrapperClassName={className}
      calendarClassName={className}
    />
  ),
)`
  font-family: ${(props) => props.theme.fontFamily};
  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text,
  .react-datepicker__year-text {
    &--selected,
    &----in-selecting-range,
    &--in-range {
      background-color: ${(props) =>
        props.theme.calendar.selectedBgColor} !important;
      color: ${(props) => props.theme.calendar.selectedColor} !important;
    }
    &--keyboard-selected {
      background-color: ${(props) => props.theme.calendar.keyboardHoverBgColor};
      color: ${(props) => props.theme.calendar.keyboardHoverColor};
    }
  }
  .react-datepicker__day {
    &--today {
      background-color: ${(props) => props.theme.calendar.todayBgColor};
      color: ${(props) => props.theme.calendar.todayColor};
    }
  }
  .react-datepicker__day {
    &--outside-month {
      opacity: 0.5;
    }
  }
  .react-datepicker__header {
    background-color: ${(props) => props.theme.calendar.header.bgColor};
    border-bottom: ${(props) =>
      `${props.theme.calendar.header.borderWidth} 
      ${props.theme.calendar.header.borderStyle} 
      ${props.theme.calendar.header.borderColor}`};
  }
  .react-datepicker__close-icon {
    &:after {
      background-color: ${(props) => props.theme.calendar.closeIcon.bgColor};
      color: ${(props) => props.theme.calendar.closeIcon.color};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  background-color: ${(props) => props.theme.calendar.bgColor};
  border-color: ${(props) => props.theme.calendar.borderColor};
  border-radius: ${(props) => props.theme.calendar.borderRadius};
`

StyledDatePicker.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    calendar: {
      margin: 0,
      height: "18px",
      padding: "2px 6px",
      borderColor: "#aeaeae",
      borderRadius: "0.3rem",
      bgColor: "#fff",
      header: {
        bgColor: "#f0f0f0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#aeaeae",
      },
      hoverBgColor: "#eee",
      hoverColor: "#000",
      keyboardHoverBgColor: "#2a87d0",
      keyboardHoverColor: "#fff",
      selectedBgColor: "#216ba5",
      selectedColor: "#fff",
      todayBgColor: "#99bbe8",
      todayColor: "#000",
      closeIcon: {
        bgColor: "#216ba5",
        color: "#fff",
      },
    },
  },
}
