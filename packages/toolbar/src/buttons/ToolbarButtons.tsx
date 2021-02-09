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
    <ToolbarButtonBase title="Поиск" {...props}>
      <SearchImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonCreate: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase title="Создание" {...props}>
      <AddImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonSave: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase title="Сохранить" {...props}>
      <SaveImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonEdit: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase title="Редактирование" {...props}>
      <EditImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonDelete: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase title="Удаление" {...props}>
      <DeleteImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonView: React.FC<ToolbarButtonInterface> = (props) => {
  return (
    <ToolbarButtonBase title="Просмотр" {...props}>
      <ViewImage />
    </ToolbarButtonBase>
  )
}

const ToolbarButtonList: React.FC<ToolbarButtonInterface> = ({
  title = "Список",
  ...props
}) => {
  return (
    <ToolbarButtonBase title={title} {...props}>
      {title}
    </ToolbarButtonBase>
  )
}

const ToolbarButtonSearch: React.FC<ToolbarButtonInterface> = ({
  title = "Найти",
  ...props
}) => {
  return (
    <ToolbarButtonBase title={title} {...props}>
      {title}
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
  ToolbarButtonList,
  ToolbarButtonSearch,
  ToolbarSplitter,
}
