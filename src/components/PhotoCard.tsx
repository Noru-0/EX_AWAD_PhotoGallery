import React from 'react';
import { Link } from 'react-router-dom';
import type { Photo } from '../types/Photo';
import { getThumbnailUrl } from '../services/photoService';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <Link 
      to={`/photos/${photo.id}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-gray-200">
        <img
          src={getThumbnailUrl(photo.id)}
          alt={`Photo by ${photo.author}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-gray-900 truncate">
          By {photo.author}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {photo.width} × {photo.height}
        </p>
      </div>
    </Link>
  );
};

export default PhotoCard;