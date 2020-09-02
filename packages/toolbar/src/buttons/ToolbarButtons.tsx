import React from "react"

import { ToolbarButtonBase, ToolbarButtonInterface } from "./ToolbarButtonBase"
import {
  SearchImage,
  AddImage,
  SaveImage,
  EditImage,
  DeleteImage,
  ViewImage,
  SplitImage,
} from "@jfront/ui-icons"
import styled from "styled-components"

const ToolbarButtonFind: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase {...props}>
      <SearchImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonCreate: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase {...props}>
      <AddImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonSave: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase {...props}>
      <SaveImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonEdit: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase {...props}>
      <EditImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonDelete: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase {...props}>
      <DeleteImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonView: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase {...props}>
      <ViewImage />
    </ToolbarButtonBase>
  )
}

const ToolbarSplitter = styled(SplitImage)`
  display: inline-block;
  background-position: center;
  background-repeat: repeat;
  height: 22px;
  width: 2px;
  float: left;
  margin-left: 2px;
  margin-right: 2px;
`

export {
  ToolbarButtonFind,
  ToolbarButtonCreate,
  ToolbarButtonSave,
  ToolbarButtonEdit,
  ToolbarButtonDelete,
  ToolbarButtonView,
  ToolbarSplitter,
}
