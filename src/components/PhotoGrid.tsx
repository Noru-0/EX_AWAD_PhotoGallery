import React, { useState, useEffect, useCallback } from 'react';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import type { Photo } from '../types/Photo';
import { fetchPhotos } from '../services/photoService';

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const newPhotos = await fetchPhotos(pageNum, 20);
      
      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos(prev => {
          if (isInitial) {
            return newPhotos;
          }
          
          // Filter out photos that already exist to prevent duplicates
          const existingIds = new Set(prev.map(photo => photo.id));
          const uniqueNewPhotos = newPhotos.filter(photo => !existingIds.has(photo.id));
          
          // If no new unique photos, we might have reached the end
          if (uniqueNewPhotos.length === 0) {
            setHasMore(false);
            return prev;
          }
          
          return [...prev, ...uniqueNewPhotos];
        });
      }
    } catch (err) {
      setError('Failed to load photos. Please try again.');
      console.error('Error loading photos:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    loadPhotos(1, true);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
        && hasMore
        && !loading
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadPhotos(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, page, loadPhotos]);

  if (error && photos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setPage(1);
              setError(null);
              setHasMore(true);
              loadPhotos(1, true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Photo Gallery
        </h1>
        
        {photos.length === 0 && loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
            
            {loading && (
              <div className="mt-8">
                <LoadingSpinner />
              </div>
            )}
            
            {!hasMore && photos.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-gray-600">No more photos to load</p>
              </div>
            )}
            
            {error && (
              <div className="text-center mt-8">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoGrid;