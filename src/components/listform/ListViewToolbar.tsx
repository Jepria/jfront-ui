import React from "react";
import {
  Toolbar, 
  ToolbarButtonCreate, 
  ToolbarButtonSave, 
  ToolbarButtonEdit, 
  ToolbarButtonDelete, 
  ToolbarButtonView, 
  ToolbarSplitter, 
  ToolbarButtonFind
  } from '../toolbar';
  
function ListViewToolbar() {
  
  return(
    <Toolbar>
    <ToolbarButtonCreate />
    <ToolbarButtonSave/>
    <ToolbarButtonEdit/>
    <ToolbarButtonView/>
    <ToolbarButtonDelete/>
    <ToolbarSplitter/>
    <ToolbarButtonFind/>
    </Toolbar>
    );
}

export default ListViewToolbar;