import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';
import { MaskedTextInput } from '@jfront/ui-input';

export const StyledInput = styled(MaskedTextInput)`
  display: flex;
`;

export const StyledDatePicker = styled(
  React.forwardRef<HTMLInputElement, ReactDatePickerProps>(({ className, ...props }, ref) => (
    <ReactDatePicker
      {...props}
      wrapperClassName={className}
      calendarClassName={className}
      ref={(innerRef) => {
        if (ref && innerRef) {
          (ref as any).current = (innerRef as any).input;
        }
      }}
    />
  ))
)`
  font-family: ${(props) => props.theme.fontFamily};
  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text,
  .react-datepicker__year-text {
    color: ${(props) => props.theme.calendar.color};
    &--selected,
    &--in-selecting-range,
    &--in-range {
      background-color: ${(props) => props.theme.calendar.selectedBgColor} !important;
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
  .react-datepicker__current-month {
    box-sizing: border-box;
    padding: 4px;
    color: ${(props) => props.theme.calendar.header.color};
  }
  .react-datepicker__navigation {
    top: 12px;
    &--previous {
      border-right-color: ${(props) => props.theme.calendar.header.buttonColor};
    }
    &--next {
      border-left-color: ${(props) => props.theme.calendar.header.buttonColor};
    }
  }
  .react-datepicker__header {
    background-color: ${(props) => props.theme.calendar.header.bgColor};
    border-bottom: ${(props) =>
      `${props.theme.calendar.header.borderWidth} 
      ${props.theme.calendar.header.borderStyle} 
      ${props.theme.calendar.header.borderColor}`};
  }
  .react-datepicker__day-name {
    color: ${(props) => props.theme.calendar.header.color};
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
`;

StyledDatePicker.defaultProps = {
  theme: {
    fontFamily: 'tahoma, arial, helvetica, sans-serif',
    calendar: {
      margin: 0,
      height: '18px',
      padding: '2px 6px',
      borderColor: '#aeaeae',
      borderRadius: '0.3rem',
      color: '#000',
      bgColor: '#fff',
      header: {
        bgColor: '#f0f0f0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#aeaeae',
        color: '#000',
        buttonColor: '#ccc',
      },
      hoverBgColor: '#eee',
      hoverColor: '#000',
      keyboardHoverBgColor: '#2a87d0',
      keyboardHoverColor: '#fff',
      selectedBgColor: '#216ba5',
      selectedColor: '#fff',
      todayBgColor: '#99bbe8',
      todayColor: '#000',
      closeIcon: {
        bgColor: '#216ba5',
        color: '#fff',
      },
    },
  },
};
