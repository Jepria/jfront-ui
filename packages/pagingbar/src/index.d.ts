import React from 'react';
interface PagingToolBarProps {
    startPageNumber?: number;
    pageCount: number;
    onChange?: (currentPageNumber: number) => void;
}
export declare const PagingToolBar: React.FC<PagingToolBarProps>;
export {};
