import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import type { Photo } from '../types/Photo';
import { fetchPhotoById, getFullSizeUrl } from '../services/photoService';

const PhotoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      if (!id) {
        setError('Photo ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const photoData = await fetchPhotoById(id);
        setPhoto(photoData);
      } catch (err) {
        setError('Failed to load photo details. Please try again.');
        console.error('Error loading photo:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Photo not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative bg-gray-200">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            <img
              src={getFullSizeUrl(photo.id, 800, 600)}
              alt={`Photo by ${photo.author}`}
              className={`w-full h-auto max-h-96 object-contain transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Photo Details
                </h1>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <p className="text-lg text-gray-900">{photo.author}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                    <p className="text-lg text-gray-900">{photo.width} × {photo.height} pixels</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo ID</label>
                    <p className="text-lg text-gray-900 font-mono">{photo.id}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-lg text-gray-900">
                      {`Beautiful landscape photography by ${photo.author}` || 'Untitled'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-700 leading-relaxed">
                      {`A stunning photograph captured by ${photo.author}. This image showcases exceptional composition and lighting, making it a perfect addition to any collection.` || 'No description available for this photo.'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={photo.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Original
                  </a>
                  
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View on Picsum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;