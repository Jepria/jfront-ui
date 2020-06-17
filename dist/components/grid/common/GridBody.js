var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
export var TableBody = styled.tbody(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  display: block;\n  overflow: auto;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  -ms-flex-positive: 1;\n      flex-grow: 1;\n  @media only screen and (min-width: 761px) {\n    width: ", ";\n    ", ";\n  }\n"], ["\n  width: 100%;\n  display: block;\n  overflow: auto;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  -ms-flex-positive: 1;\n      flex-grow: 1;\n  @media only screen and (min-width: 761px) {\n    width: ", ";\n    ", ";\n  }\n"])), function (props) { return "calc(100% + " + (props.scrollWidth ? props.scrollWidth : 0) + "px)"; }, function (props) { return props.scrollWidth ? "right: -" + props.scrollWidth + "px" : ''; });
var Scroll = styled.tbody(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: block;\n  position: absolute;\n  opacity: 0.5;\n  z-index: 2;\n  width: 17px;\n  right: 0;\n  top: ", "px;\n  height: ", "px;\n  background-color: transparent;\n  overflow: auto;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: none; \n  }\n"], ["\n  display: block;\n  position: absolute;\n  opacity: 0.5;\n  z-index: 2;\n  width: 17px;\n  right: 0;\n  top: ", "px;\n  height: ", "px;\n  background-color: transparent;\n  overflow: auto;\n  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {\n    display: none; \n  }\n"])), function (props) { return props.top; }, function (props) { return props.height ? props.height : 0; });
var ScrollSpacer = styled.tr(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: block;\n  width: 1px;\n  background-color: transparent;\n  height: ", "px;\n"], ["\n  display: block;\n  width: 1px;\n  background-color: transparent;\n  height: ", "px;\n"])), function (props) { return props.height ? props.height : 0; });
export var GridBody = function (_a) {
    var children = _a.children;
    var refThis = useRef(null);
    var refScroll = useRef(null);
    var _b = useState(undefined), height = _b[0], setHeight = _b[1];
    var _c = useState(undefined), scrollHeight = _c[0], setScrollHeight = _c[1];
    var _d = useState(undefined), scrollWidth = _d[0], setScrollWidth = _d[1];
    var _e = useState(undefined), scrollTop = _e[0], setScrollTop = _e[1];
    useLayoutEffect(function () {
        if (refThis.current && scrollTop !== refThis.current.offsetTop) {
            setScrollTop(refThis.current.offsetTop);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height]);
    var getScrollHeight = function () {
        var _a, _b, _c, _d;
        if (height && ((_a = refThis.current) === null || _a === void 0 ? void 0 : _a.clientWidth)
            && ((_b = refThis.current) === null || _b === void 0 ? void 0 : _b.scrollWidth)
            && ((_c = refThis.current) === null || _c === void 0 ? void 0 : _c.clientWidth) < ((_d = refThis.current) === null || _d === void 0 ? void 0 : _d.scrollWidth)) {
            return height - (refThis.current.offsetHeight - refThis.current.clientHeight);
        }
        else {
            return height;
        }
    };
    var resize = function () {
        var _a, _b;
        if (height !== ((_a = refThis.current) === null || _a === void 0 ? void 0 : _a.offsetHeight)) {
            setHeight((_b = refThis.current) === null || _b === void 0 ? void 0 : _b.offsetHeight);
        }
    };
    useLayoutEffect(function () {
        window.addEventListener("resize", resize);
        resize();
        return function () { return window.removeEventListener("resize", resize); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useLayoutEffect(function () {
        var refTbody = refThis.current;
        var refScrollPanel = refScroll.current;
        var ignoreScrollEvents = false;
        var handleScroll = function (e) {
            var onScroll = function () {
                var _a;
                if (refTbody) {
                    var thead = (_a = refTbody === null || refTbody === void 0 ? void 0 : refTbody.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('thead')[0];
                    if (thead) {
                        thead.scrollLeft = refTbody.scrollLeft;
                    }
                    if (refScrollPanel && refTbody) {
                        var ignore = ignoreScrollEvents;
                        ignoreScrollEvents = false;
                        if (ignore)
                            return;
                        ignoreScrollEvents = true;
                        if (e.target === refTbody) {
                            refScrollPanel.scrollTop = refTbody.scrollTop;
                        }
                        else {
                            refTbody.scrollTop = refScrollPanel.scrollTop;
                        }
                    }
                }
            };
            onScroll();
        };
        refTbody === null || refTbody === void 0 ? void 0 : refTbody.addEventListener("scroll", handleScroll);
        refScrollPanel === null || refScrollPanel === void 0 ? void 0 : refScrollPanel.addEventListener("scroll", handleScroll);
        return function () {
            refTbody === null || refTbody === void 0 ? void 0 : refTbody.removeEventListener("scroll", handleScroll);
            refScrollPanel === null || refScrollPanel === void 0 ? void 0 : refScrollPanel.removeEventListener("scroll", handleScroll);
        };
    }, []);
    //eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var newScrollWidth = ((_a = refThis.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) && ((_b = refThis.current) === null || _b === void 0 ? void 0 : _b.clientWidth) !== 0 ? ((_c = refThis.current) === null || _c === void 0 ? void 0 : _c.offsetWidth) - ((_d = refThis.current) === null || _d === void 0 ? void 0 : _d.clientWidth) : undefined;
        if (scrollWidth !== newScrollWidth) {
            setScrollWidth(newScrollWidth);
        }
        if (scrollHeight !== ((_e = refThis.current) === null || _e === void 0 ? void 0 : _e.scrollHeight)) {
            setScrollHeight(((_f = refThis.current) === null || _f === void 0 ? void 0 : _f.scrollHeight) ? ((_g = refThis.current) === null || _g === void 0 ? void 0 : _g.scrollHeight) - 1 : undefined);
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(TableBody, { ref: refThis, scrollWidth: scrollWidth }, children),
        React.createElement(Scroll, { ref: refScroll, height: getScrollHeight(), top: scrollTop },
            React.createElement(ScrollSpacer, { height: scrollHeight }))));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=GridBody.js.map