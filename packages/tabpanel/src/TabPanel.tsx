import styled from "styled-components"

const TabPanel = styled.div`
  height: 22px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.tabPanel.color};
  z-index: 1;
  flex-shrink: 0;
`

TabPanel.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      small: "11px",
    },
    tabPanel: {
      color: "rgb(21, 66, 139)",
    },
  },
}

interface TabProps {
  selected?: boolean
}

const Tab = styled.div<TabProps>`
  display: inline-block;
  height: 16px;
  text-align: center;
  margin-left: 2px;
  padding: 3px 6px 2px 6px;
  min-width: 20px;
  border: ${(props) =>
    `${props.theme.tabPanel.tab.borderWidth} 
    ${props.theme.tabPanel.tab.borderStyle} 
    ${props.theme.tabPanel.tab.borderColor}`};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  ${(props) =>
    props.selected
      ? `
    background: ${props.theme.tabPanel.tab.selectedBgColor};
    border-bottom-color: ${props.theme.tabPanel.tab.selectedBgColor};
    cursor: default;
    font-weight: bold;
  `
      : `
    background: ${props.theme.tabPanel.tab.bgColor};
    cursor: pointer;
    &:hover {
      opacity: 0.8
    }
  `}
`

Tab.defaultProps = {
  theme: {
    fontFamily: "tahoma, arial, helvetica, sans-serif",
    fontSize: {
      small: "11px",
    },
    tabPanel: {
      tab: {
        bgColor: "linear-gradient(#dae6f4, #d0def0)",
        selectedBgColor: "#d7e4f3",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#99bbe8",
        borderRadius: 0,
      },
    },
  },
}

export { TabPanel, Tab }
