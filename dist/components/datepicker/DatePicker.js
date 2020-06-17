import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
export var DatePicker = function (_a) {
    var _b = _a.peekNextMonth, peekNextMonth = _b === void 0 ? true : _b, _c = _a.showMonthDropdown, showMonthDropdown = _c === void 0 ? true : _c, _d = _a.showYearDropdown, showYearDropdown = _d === void 0 ? true : _d, _e = _a.dropdownMode, dropdownMode = _e === void 0 ? "select" : _e, _f = _a.dateFormat, dateFormat = _f === void 0 ? "yyyy-MM-dd" : _f, _g = _a.autoComplete, autoComplete = _g === void 0 ? "off" : _g, _h = _a.locale, locale = _h === void 0 ? ru : _h, name = _a.name, onChange = _a.onChange, selected = _a.selected;
    return (React.createElement(ReactDatePicker, { name: name, selected: selected, onChange: onChange, peekNextMonth: peekNextMonth, showMonthDropdown: showMonthDropdown, showYearDropdown: showYearDropdown, dropdownMode: dropdownMode, dateFormat: dateFormat, autoComplete: autoComplete, locale: locale }));
};
//# sourceMappingURL=DatePicker.js.map