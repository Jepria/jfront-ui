import React from 'react';

type ListViewContextType = {
    selectRow?: (obj: object) => void,
    rowDoubleClick?: (obj: object) => void
}

const ListViewContext = React.createContext<ListViewContextType>({});

export default ListViewContext;