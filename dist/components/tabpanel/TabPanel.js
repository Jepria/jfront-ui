var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import bg from './images/bg.png';
var TabPanel = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height:22px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  color: rgb(21, 66, 139);\n  font-size: 11px;\n"], ["\n  height:22px;\n  font-family: tahoma, arial, helvetica, sans-serif;\n  color: rgb(21, 66, 139);\n  font-size: 11px;\n"])));
var Tab = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-block;\n  height:16px;\n  text-align:center;\n  margin-left: 2px;\n  padding: 3px 6px 3px 6px;\n  min-width: 20px;\n  border: 1px solid #8DB2E3;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-color: #D7E4F3;\n  ", "\n"], ["\n  display: inline-block;\n  height:16px;\n  text-align:center;\n  margin-left: 2px;\n  padding: 3px 6px 3px 6px;\n  min-width: 20px;\n  border: 1px solid #8DB2E3;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-color: #D7E4F3;\n  ",
    "\n"])), function (props) { return props.selected ? "\n  background-color: #D7E4F3;\n    cursor: default;\n    font-weight: bold;\n  " : "\n    background-image: url(" + bg + ");\n    background-color: white;\n    background-repeat: repeat;\n    background-position: 0 100%;\n    cursor: pointer;\n    &:hover{\n    opacity: 0.8\n  }\n  "; });
export { TabPanel, Tab };
var templateObject_1, templateObject_2;
//# sourceMappingURL=TabPanel.js.map