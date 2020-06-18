import React, {useContext } from "react";
import {
  JepGrid, 
  JepGridTable, 
  JepGridBody, 
  JepGridHeader, 
  JepGridHeaderCell, 
  JepGridRow, 
  JepGridRowCell
  } from '../grid/jepgrid';
import ListViewContext from './ListFormContext';

type ColumnType = {
  header: string,
  field: string
}

interface ListViewGridProps {
  columns: ColumnType[]; 
  data: any[];
  selected: object;
}

const ListViewGrid:React.FC<ListViewGridProps> = props => {
  const {selectRow, rowDoubleClick} = useContext(ListViewContext);

  const isSelected = (row: object) => {
    return (props.selected === row);
  }

  return(
    props.data ? (
    <div>
    <JepGrid>
      <JepGridTable>
      <JepGridHeader>
        {props.columns.map(column => 
          <JepGridHeaderCell 
            key={column.field}>{column.header}
          </JepGridHeaderCell>
        )}
      </JepGridHeader>
      <JepGridBody>
          {props.data.map(row =>
          <JepGridRow 
            selected={isSelected(row)} 
            key={row.id} 
            onClick={() => selectRow!(row)} 
            onDoubleClick={() => rowDoubleClick!(row)}
          >
            {props.columns.map(column => 
              <JepGridRowCell 
                key={row.id+column.field}
              >
                  {row[column.field]}
              </JepGridRowCell>
            )}
          </JepGridRow>
          )}
      </JepGridBody>
      </JepGridTable>
    </JepGrid>
    </div>
    ) : (
      <div>No Data Found</div>
    )
  );
}

export default ListViewGrid;