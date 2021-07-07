import { Theme, createTheme } from "@jfront/ui-core"
import Color from "color"

const themeValues: Theme = {
  primaryColor: Color("#474747").lighten(0.35).hex(),
  bodyBgColor: "rgb(13, 17, 23)",
  componentBgColor: "rgb(13, 17, 23)",
  fontFamily: "arial, tahoma, verdana, helvetica, -apple-system",
  textColor: Color("rgb(255, 255, 255)").darken(0.25).hex(),
  fontSize: {
    xs: "10px",
    sm: "11px",
    md: "12px",
    lg: "14px",
    xlg: "16px",
  },
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#474747",
  borderRadius: "3px",
  errorColor: Color("red").lighten(0.5).hex(),
  button: {
    borderRadius: "5px",
    margin: "4px",
    fontWeight: "700",
    padding: "12px 24px",
    primary: {
      borderRadius: "5px",
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
      bgColor: "rgb(22,27,34)",
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
      label: {
        bgColor: "transparent",
        selectedBgColor: "#dae6f4",
      },
    },
  },
  toolbar: {
    bgColor: "rgb(22, 27, 34)",
    button: {
      bgColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      borderRadius: "0",
      hoverBgColor: "rgb(22, 27, 34)",
      hoverBorderWidth: "1px",
      hoverBorderStyle: "solid",
    },
  },
  tabPanel: {
    tab: {
      bgColor: "rgb(22, 27, 34)",
      selectedBgColor: "rgb(22, 27, 34)",
    },
  },
  form: {
    padding: "5px 0 0 10px",
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
    header: {
      bgColor: "rgb(22,27,34)",
    },
    row: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "0",
    },
    pagingBar: {
      bgColor: "rgb(22,27,34)",
    },
  },
  modal: {
    borderRadius: "5px",
    // closeButtonColor: "rgb(21, 66, 139)",
    header: {
      borderWidth: "0",
      borderStyle: "solid",
      borderColor: "transparent",
      borderRadius: "5px",
      // bgColor: "linear-gradient(rgb(255, 255, 255), rgb(208, 222, 240))",
      // color: "rgb(21, 66, 139)",
    },
  },
}

const theme = createTheme(themeValues)

export default theme
