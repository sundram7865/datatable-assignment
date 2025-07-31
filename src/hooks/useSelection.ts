import { useState, useRef } from 'react';
import type { Artwork } from '../types/artwork';
import { Toast } from 'primereact/toast';

const MAX_SELECTION = 100;
const PAGE_SIZE = 12;

export default function useSelection() {
  const [selectedRows, setSelectedRows] = useState<Record<number, Artwork>>({});
  const [overlayInput, setOverlayInput] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const op = useRef<Toast>(null);
  const toast = useRef<Toast>(null);

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
    isRowSelected,
    toggleRow,
    overlayInput,
    setOverlayInput,
    isSubmitting,
    op,
    toast,
    forceUpdate
  };
}