import { useState, useEffect } from 'react';
import { fetchArtworks } from '../services/artworkService';
import type { Artwork } from '../types/artwork';

const PAGE_SIZE = 12;

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const { data, totalRecords } = await fetchArtworks(page, PAGE_SIZE);
      setArtworks(data);
      setTotalRecords(totalRecords);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(page);
  }, [page]);

  return {
    artworks,
    totalRecords,
    loading,
    page,
    setPage,
    loadPage,
    PAGE_SIZE
  };
};