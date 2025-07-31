import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Artwork } from '../types/artwork';

const PAGE_SIZE = 12;

export default function useArtworkData() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=${PAGE_SIZE}`
      );
      setArtworks(response.data.data);
      setTotalRecords(response.data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
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
    loadPage
  };
}