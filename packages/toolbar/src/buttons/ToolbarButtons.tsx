import React from "react";

import btn_add from "./icons/add.png";
import btn_save from "./icons/save.png";
import btn_edit from "./icons/edit.png";
import btn_find from "./icons/search.png";
import btn_delete from "./icons/delete.png";
import btn_view from "./icons/view.png";
import split from "./icons/split.gif";

import {ToolbarButtonBase, ToolbarButtonInterface} from "./ToolbarButtonBase";
import styled from "styled-components";


const ToolbarButtonFind: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_find}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonCreate: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_add}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonSave: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_save}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonEdit: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_edit}/>
      </ToolbarButtonBase>
  );
};

const ToolbarButtonDelete: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_delete}/>
      </ToolbarButtonBase>
  );
}

const ToolbarButtonView: React.FC<ToolbarButtonInterface> = (props) => {
  return (
      <ToolbarButtonBase {...props}>
        <img src={btn_view}/>
      </ToolbarButtonBase>
  );
}

const ToolbarSplitter = styled.span`
  display: inline-block;
  background-position: center;
  background-repeat: repeat;
  height: 22px;
  width: 2px;
  float: left;
  margin-left: 2px;
  margin-right: 2px;
  background-image: url(${split});
`;

export {
  ToolbarButtonFind,
  ToolbarButtonCreate,
  ToolbarButtonSave,
  ToolbarButtonEdit,
  ToolbarButtonDelete,
  ToolbarButtonView,
  ToolbarSplitter,
}