import React, { useState } from "react";
import { JepGridPagingBar } from '../grid/jepgrid';
import {Page, Header, Content, Footer} from '../layout'
import ListViewToolbar from './ListViewToolbar';
import ListViewGrid from './ListViewGrid';
import ListViewContext from './ListFormContext';

type ColumnType = {
  header: string,
  field: string
}

interface ListViewProps {
  columns: ColumnType[]; 
  data: any[];
}

export const ListForm:React.FC<ListViewProps> = props => {
  // data state to store selected row. Its initial value is an empty object
  const [selected, setSelected] = useState({});

  const selectRow = (row: object)  => {
    (row !== selected) ? setSelected(row) : setSelected({});
  }

  const rowDoubleClick = (row: object) => {
    window.alert('Double Clicked on row: '+row)
  }

  return (
  <ListViewContext.Provider value={{selectRow, rowDoubleClick}}>
  <Page>
    <Header>
      <ListViewToolbar />
    </Header>
    <Content>
      <ListViewGrid 
        columns={props.columns} 
        data={props.data} 
        selected={selected} 
      />
    </Content>
    <Footer>
      <JepGridPagingBar />
    </Footer>
  </Page>
  </ListViewContext.Provider>
  );
}
