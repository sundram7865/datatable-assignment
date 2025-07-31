import { useState } from 'react';
import { fetchArtworks } from '../services/artworkService';
import type { Artwork } from '../types/artwork';

export const useBulkSelection = (
  selectedRows: { [id: number]: Artwork },
  setSelectedRows: (rows: { [id: number]: Artwork }) => void
) => {
  const [overlayInput, setOverlayInput] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBulkSelection = async (
    currentPage: number,
    artworks: Artwork[],
    totalRecords: number
  ) => {
    if (overlayInput <= 0) return 0;

    setIsSubmitting(true);
    
    try {
      let remainingToSelect = overlayInput;
      let currentPageIndex = currentPage;
      const newSelected = { ...selectedRows };

      // First, select from current page
      const currentPageItems = artworks.filter((row: Artwork) => !newSelected[row.id]);
      const toSelectCurrentPage = currentPageItems.slice(0, remainingToSelect);
      
      toSelectCurrentPage.forEach((row: Artwork) => {
        newSelected[row.id] = row;
      });
      remainingToSelect -= toSelectCurrentPage.length;

      // If we need more items, fetch and select from subsequent pages
      while (remainingToSelect > 0) {
        currentPageIndex++;
        if (currentPageIndex * artworks.length >= totalRecords) break;

        const { data: nextPageItems } = await fetchArtworks(currentPageIndex, artworks.length);
        const toSelectNextPage = nextPageItems
          .filter((row: Artwork) => !newSelected[row.id])
          .slice(0, remainingToSelect);

        toSelectNextPage.forEach((row: Artwork) => {
          newSelected[row.id] = row;
        });
        remainingToSelect -= toSelectNextPage.length;
      }

      setSelectedRows(newSelected);
      return overlayInput - remainingToSelect;
    } catch (error) {
      console.error('Error during bulk selection:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    overlayInput,
    setOverlayInput,
    isSubmitting,
    handleBulkSelection
  };
};