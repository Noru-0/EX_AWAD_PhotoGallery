import React, { useEffect, useCallback, useRef } from 'react';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import { fetchPhotos } from '../services/photoService';
import { usePhotoGallery } from '../contexts/PhotoGalleryContext';
import { useScrollRestoration, useScrollCapture } from '../hooks/useScrollRestoration';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const PhotoGrid: React.FC = () => {
  const {
    state: { photos, loading, hasMore, error, scrollPosition },
    setPhotos,
    addPhotos,
    setCurrentPage,
    setHasMore,
    setScrollPosition,
    setLoading,
    setError,
  } = usePhotoGallery();

  const currentPageRef = useRef(1);

  const loadPhotos = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const newPhotos = await fetchPhotos(pageNum, 20);
      
      // Lorem Picsum API has over 1000+ photos, so we check for actual end
      // The API will return less than requested limit when we reach the end
      if (newPhotos.length < 20) {
        setHasMore(false);
      }
      
      if (newPhotos.length > 0) {
        if (isInitial) {
          setPhotos(newPhotos);
        } else {
          addPhotos(newPhotos);
        }
        currentPageRef.current = pageNum;
        setCurrentPage(pageNum);
      } else {
        // Only set hasMore to false if we get no photos at all
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to load photos. Please try again.');
      console.error('Error loading photos:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, setLoading, setError, setPhotos, addPhotos, setCurrentPage, setHasMore]);

  // Initial load - only if no photos exist
  useEffect(() => {
    if (photos.length === 0) {
      loadPhotos(1, true);
    }
  }, [photos.length, loadPhotos]);

  // Use custom hooks for scroll management
  useScrollRestoration(photos.length > 0, scrollPosition, [photos.length]);
  useScrollCapture(setScrollPosition);

  // Infinite scroll
  const handleLoadMore = useCallback(() => {
    currentPageRef.current += 1;
    loadPhotos(currentPageRef.current);
  }, [loadPhotos]);

  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: handleLoadMore,
    threshold: 1000
  });

  if (error && photos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              currentPageRef.current = 1;
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