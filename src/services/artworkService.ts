import axios from 'axios';
import type { Artwork } from '../types/artwork';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number, limit: number) => {
  const response = await axios.get(`${API_BASE_URL}?page=${page + 1}&limit=${limit}`);
  return {
    data: response.data.data,
    totalRecords: response.data.pagination.total
  };
};