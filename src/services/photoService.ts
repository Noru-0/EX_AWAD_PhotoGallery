import type { Photo } from '../types/Photo';

const API_BASE_URL = 'https://picsum.photos';

export const fetchPhotos = async (page: number = 1, limit: number = 20): Promise<Photo[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/v2/list?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchPhotoById = async (id: string): Promise<Photo> => {
  try {
    const response = await fetch(`${API_BASE_URL}/id/${id}/info`);
    if (!response.ok) {
      throw new Error('Failed to fetch photo details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};

export const getPhotoUrl = (id: string, width: number = 400, height: number = 300): string => {
  return `${API_BASE_URL}/id/${id}/${width}/${height}`;
};

export const getThumbnailUrl = (id: string): string => {
  return getPhotoUrl(id, 300, 200);
};

export const getFullSizeUrl = (id: string, width: number = 800, height: number = 600): string => {
  return getPhotoUrl(id, width, height);
};

export const getOriginalSizeUrl = (photo: Photo): string => {
  // Use the photo's original dimensions to get the full resolution image
  return getPhotoUrl(photo.id, photo.width, photo.height);
};

export const getOriginalImageUrl = (photo: Photo): string => {
  // Use download_url which provides the original image
  return photo.download_url;
};