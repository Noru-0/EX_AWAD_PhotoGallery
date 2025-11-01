import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Photo } from '../types/Photo';

interface PhotoGalleryState {
  photos: Photo[];
  currentPage: number;
  hasMore: boolean;
  scrollPosition: number;
  loading: boolean;
  error: string | null;
}

interface PhotoGalleryContextType {
  state: PhotoGalleryState;
  setPhotos: (photos: Photo[]) => void;
  addPhotos: (photos: Photo[]) => void;
  setCurrentPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setScrollPosition: (position: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

const initialState: PhotoGalleryState = {
  photos: [],
  currentPage: 1,
  hasMore: true,
  scrollPosition: 0,
  loading: false,
  error: null,
};

const PhotoGalleryContext = createContext<PhotoGalleryContextType | undefined>(undefined);

interface PhotoGalleryProviderProps {
  children: ReactNode;
}

export const PhotoGalleryProvider: React.FC<PhotoGalleryProviderProps> = ({ children }) => {
  const [state, setState] = useState<PhotoGalleryState>(initialState);

  const setPhotos = useCallback((photos: Photo[]) => {
    setState(prev => ({ ...prev, photos }));
  }, []);

  const addPhotos = useCallback((photos: Photo[]) => {
    setState(prev => ({ ...prev, photos: [...prev.photos, ...photos] }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const setHasMore = useCallback((hasMore: boolean) => {
    setState(prev => ({ ...prev, hasMore }));
  }, []);

  const setScrollPosition = useCallback((position: number) => {
    setState(prev => ({ ...prev, scrollPosition: position }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const value: PhotoGalleryContextType = useMemo(() => ({
    state,
    setPhotos,
    addPhotos,
    setCurrentPage,
    setHasMore,
    setScrollPosition,
    setLoading,
    setError,
    resetState,
  }), [
    state,
    setPhotos,
    addPhotos,
    setCurrentPage,
    setHasMore,
    setScrollPosition,
    setLoading,
    setError,
    resetState,
  ]);

  return (
    <PhotoGalleryContext.Provider value={value}>
      {children}
    </PhotoGalleryContext.Provider>
  );
};

export const usePhotoGallery = (): PhotoGalleryContextType => {
  const context = useContext(PhotoGalleryContext);
  if (context === undefined) {
    throw new Error('usePhotoGallery must be used within a PhotoGalleryProvider');
  }
  return context;
};