import { Theme } from "../types"
import { createTheme } from "../utils/createTheme"

const themeValues: Theme = {
  primaryColor: "#99bbe8",
  bodyBgColor: "#fff",
  componentBgColor: "#fff",
  fontFamily: "arial, tahoma, verdana, helvetica, -apple-system",
  textColor: "rgb(0, 0, 0)",
  textColorSecondary: "rgba(0, 0, 0, 0.75)",
  fontSize: {
    xs: "10px",
    sm: "11px",
    md: "12px",
    lg: "14px",
    xlg: "16px",
  },
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ccc",
  borderRadius: "0",
  button: {
    borderRadius: "5px",
    margin: "4px",
    fontWeight: "700",
    padding: "12px 24px",
    hoverBgColor: "rgb(217, 235, 251)",
    hoverBorderColor: "rgb(153, 187, 232)",
    activeBgColor: "#b6cbe4",
    activeBorderColor: "1px solid #b6cbe4",
    primary: {
      borderColor: "rgb(153, 187, 232)",
      borderRadius: "5px",
      hoverBgColor: "rgba(221, 239, 255, 0.55)",
      hoverBorderColor: "rgb(153, 187, 232)",
      activeBgColor: "#b6cbe4",
      activeBorderColor: "#b6cbe4",
    },
  },
  label: {
    margin: "0",
    padding: "0 5px 0 0",
    maxWidth: "200px",
    minWidth: "150px",
  },
  input: {
    height: "24px",
    margin: "0",
    padding: "0",
    errorBorderColor: "red",
    disabledColor: "rgba(0, 0, 0, 0.75)",
    disabledBgColor: "rgba(239, 239, 239, 0.5)",
  },
  textArea: {
    height: "100px",
  },
  comboBox: {
    height: "24px",
    button: {
      height: "22px",
      width: "22px",
      bgColor: "#f2f0f0",
      color: "#999",
    },
    item: {
      margin: "0",
      height: "18px",
      padding: "2px 6px",
      borderWidth: "0",
      hoverBgColor: "#eee",
      disabledColor: "rgba(0, 0, 0, 0.33)",
      selectedBgColor: "#ccddf3",
    },
  },
  calendar: {
    margin: "0",
    height: "18px",
    padding: "2px 6px",
    borderRadius: "0.3rem",
    hoverBgColor: "#eee",
    keyboardHoverBgColor: "#2a87d0",
    selectedBgColor: "#216ba5",
    selectedColor: "#fff",
    header: {
      bgColor: "#f0f0f0",
      buttonColor: "#ccc",
    },
    closeIcon: {
      bgColor: "#216ba5",
      color: "#fff",
    },
  },
  tree: {
    errorBorderColor: "red",
    node: {
      margin: "0",
      padding: "5px 8px",
      bgColor: "transparent",
      hoverBgColor: "#eee",
      label: {
        bgColor: "transparent",
        selectedBgColor: "#dae6f4",
      },
    },
  },
  toolbar: {
    bgColor: "linear-gradient(#dae6f4, #d0def0)",
    borderColor: "#99bbe8",
    button: {
      bgColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      borderRadius: "0",
      hoverBgColor: "#ddefff",
      hoverBorderWidth: "1px",
      hoverBorderStyle: "solid",
      hoverBorderColor: "#99bbe8",
    },
  },
  tabPanel: {
    color: "rgb(21, 66, 139)",
    tab: {
      bgColor: "linear-gradient(#dae6f4, #d0def0)",
      selectedBgColor: "#d7e4f3",
      borderColor: "#99bbe8",
    },
  },
  form: {
    padding: "5px 0 0 10px",
    errorColor: "red",
    field: {
      margin: "0 0 1em 0",
      control: {
        maxWidth: "150px",
      },
    },
    fieldSet: {
      borderRadius: "5px",
    },
    legend: {
      margin: "0 5px",
    },
  },
  link: {
    color: "rgb(21, 66, 139)",
    textDecoration: "underline",
  },
  breadcrumbs: {
    color: "currentColor",
  },
  grid: {
    color: "black",
    header: {
      color: "black",
      bgColor: "#ededed",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ddd",
      borderRadius: "0",
    },
    row: {
      color: "black",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ededed",
      borderRadius: "0",
      bgColor: "transparent",
      oddBgColor: "#fafafa",
      hoverBgColor: "#eee",
      selectedBgColor: "#dfe8f6",
      selectedBorderColor: "#b7cefd",
    },
    pagingBar: {
      color: "black",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "rgb(153, 187, 232)",
      borderRadius: "0",
      bgColor: "linear-gradient(rgb(218, 230, 244), rgb(208, 222, 240))",
    },
  },
  modal: {
    borderRadius: "5px",
    closeButtonColor: "rgb(21, 66, 139)",
    header: {
      borderWidth: "0",
      borderStyle: "solid",
      borderColor: "transparent",
      borderRadius: "5px",
      bgColor: "linear-gradient(rgb(255, 255, 255), rgb(208, 222, 240))",
      color: "rgb(21, 66, 139)",
    },
  },
}

const theme = createTheme(themeValues)

export { theme as jepriaTheme }
