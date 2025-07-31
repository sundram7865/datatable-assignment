import { useState } from 'react';
import type { Artwork } from '../types/artwork';



export const useSelection = () => {
  const [selectedRows, setSelectedRows] = useState<{ [id: number]: Artwork }>({});
  const [forceUpdate, setForceUpdate] = useState(0);

  const isRowSelected = (row: Artwork) => !!selectedRows[row.id];

  const toggleRow = (row: Artwork) => {
    setSelectedRows(prev => {
      const newSelected = { ...prev };
      if (newSelected[row.id]) {
        delete newSelected[row.id];
      } else {
        newSelected[row.id] = row;
      }
      return newSelected;
    });
    setForceUpdate(prev => prev + 1);
  };

  return {
    selectedRows,
    setSelectedRows,
    isRowSelected,
    toggleRow,
    forceUpdate,

  };
};