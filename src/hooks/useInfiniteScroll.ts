import { useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({ 
  hasMore, 
  loading, 
  onLoadMore, 
  threshold = 1000 
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - threshold
      && hasMore
      && !loading
    ) {
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};