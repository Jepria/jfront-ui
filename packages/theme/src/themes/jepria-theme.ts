import { Theme } from "../types"

export type JepriaTheme = Theme & {}

export const jepriaTheme: JepriaTheme = {
  primaryColor: "#15428b",
  secondaryColor: "#d7e4f3",
  fontFamily: "tahoma, arial, helvetica, sans-serif, -apple-system",
  primaryTextColor: "rgb(0, 0, 0)",
  secondaryTextColor: "rgba(0, 0, 0, 0.75)",
  breakpoints: {
    small: "max-width: 575.98px",
    // Small devices (landscape phones, less than 768px)
    medium: "max-width: 767.98px",
    // Medium devices (tablets, less than 992px)
    large: "max-width: 991.98px",
    // Large devices (desktops, less than 1200px)
    extraLarge: "max-width: 1199.98px",
  },
  fontSize: {
    small: "11px",
    medium: "13px",
    large: "15px",
  },
}
