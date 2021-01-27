import styled from "styled-components"
import { LoaderImage } from "@jfront/ui-icons"

export const GlassMask = styled.div`
  background-color: #000;
  opacity: 0.2;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 7100;
`

export const MaskPanel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid #ccc;
  padding: 8px;
  background: white;
  color: #444;
  z-index: 7200;
  display: inline-table;
`

export const Image = styled(LoaderImage)`
  margin-right: 8px;
  float: left;
  height: 100%;
`

export const Text = styled.p`
  font: normal 10px arial, tahoma, sans-serif;
  font-family: arial, helvetica, tahoma, sans-serif;
  margin: 0px;
  white-space: nowrap;
`

export const Header = styled.p`
  font: bold 13px tahoma, arial, helvetica;
  font-family: arial, helvetica, tahoma, sans-serif;
  margin: 0px;
  white-space: nowrap;
`

export const InlineBlock = styled.div`
  display: inline-block;
`
