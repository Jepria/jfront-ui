export type Theme = {
  primaryColor?: string
  secondaryColor?: string
  fontFamily?: string
  boxShadow?: string
  primaryTextColor?: string
  secondaryTextColor?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  breakpoints?: {
    small?: string
    medium?: string
    large?: string
    extraLarge?: string
  }
  fontSize?: {
    small?: string
    medium?: string
    large?: string
  }
  comboBox?: {
    height?: string
    margin?: string
    padding?: string
    borderColor?: string
    borderWidth?: string
    borderStyle?: string
    borderRadius?: string
    color?: string
    bgColor?: string
    focusedBorderColor?: string
    focusedColor?: string
    focusedBgColor?: string
    errorBorderColor?: string
    errorColor?: string
    errorBgColor?: string
    disabledColor?: string
    disabledBorderColor?: string
    disabledBgColor?: string
    hoverColor?: string
    hoverBorderColor?: string
    hoverBgBorder?: string
    button?: {
      height?: string
      width?: string
      bgColor?: string
      color?: string
    }
    item?: {
      margin?: string
      height?: string
      padding?: string
      borderWidth?: string
      borderStyle?: string
      borderColor?: string
      borderRadius?: string
      bgColor?: string
      color?: string
      hoverBgColor?: string
      hoverColor?: string
      disabledBgColor?: string
      disabledColor?: string
      selectedBgColor?: string
      selectedColor?: string
    }
  }
  input?: {
    height?: string
    margin?: string
    padding?: string
    borderColor?: string
    borderWidth?: string
    borderStyle?: string
    borderRadius?: string
    color?: string
    bgColor?: string
    focusedBorderColor?: string
    focusedColor?: string
    focusedBgColor?: string
    errorBorderColor?: string
    errorColor?: string
    errorBgColor?: string
    disabledColor?: string
    disabledBorderColor?: string
    disabledBgColor?: string
    hoverColor?: string
    hoverBorderColor?: string
    hoverBgBorder?: string
  }
  textArea?: {
    height?: string
    margin?: string
    padding?: string
    borderColor?: string
    borderWidth?: string
    borderStyle?: string
    borderRadius?: string
    color?: string
    bgColor?: string
    focusedBorderColor?: string
    focusedColor?: string
    focusedBgColor?: string
    errorBorderColor?: string
    errorColor?: string
    errorBgColor?: string
    disabledColor?: string
    disabledBorderColor?: string
    disabledBgColor?: string
    hoverColor?: string
    hoverBorderColor?: string
    hoverBgBorder?: string
  }
  button?: {
    fontWeight?: string
    margin?: string
    padding?: string
    borderColor?: string
    borderWidth?: string
    borderStyle?: string
    borderRadius?: string
    bgColor?: string
    color?: string
    hoverBgColor?: string
    hoverColor?: string
    hoverBorderColor?: string
    activeBgColor?: string
    activeColor?: string
    activeBorderColor?: string
    disabledBgColor?: string
    disabledColor?: string
    disabledBorderColor?: string
    primary?: {
      borderColor?: string
      borderRadius?: string
      bgColor?: string
      color?: string
      hoverBgColor?: string
      hoverColor?: string
      hoverBorderColor?: string
      activeBgColor?: string
      activeColor?: string
      activeBorderColor?: string
      disabledBgColor?: string
      disabledColor?: string
      disabledBorderColor?: string
    }
  }
  calendar?: {
    margin?: string
    height?: string
    padding?: string
    borderColor?: string
    borderRadius?: string
    bgColor?: string
    header?: {
      bgColor?: string
      borderWidth?: string
      borderStyle?: string
      borderColor?: string
    }
    hoverBgColor?: string
    hoverColor?: string
    keyboardHoverBgColor?: string
    keyboardHoverColor?: string
    selectedBgColor?: string
    selectedColor?: string
    todayBgColor?: string
    todayColor?: string
    closeIcon: {
      bgColor?: string
      color?: string
    }
    toolbar?: {
      bgColor?: string
      borderWidth?: string
      borderStyle?: string
      borderColor?: string
      borderRadius?: string
      button?: {
        bgColor?: string
        borderWidth?: string
        borderStyle?: string
        borderColor?: string
        borderRadius?: string
        hoverBgColor?: string
        hoverBorderWidth?: string
        hoverBorderStyle?: string
        hoverBorderColor?: string
      }
    }
    tabPanel?: {
      color?: string
      tab?: {
        bgColor?: string
        selectedBgColor?: string
        borderWidth?: string
        borderStyle?: string
        borderColor?: string
        borderRadius?: string
      }
    }
    form?: {
      padding?: string
      errorColor?: string
      field?: {
        margin?: string
        control?: {
          maxWidth?: string
        }
      }
      label?: {
        maxWidth?: string
        minWidth?: string
      }
      fieldSet?: {
        borderWidth?: string
        borderStyle?: string
        borderColor?: string
        borderRadius?: string
      }
      legend?: {
        color?: string
        margin?: string
      }
    }
  }
}
