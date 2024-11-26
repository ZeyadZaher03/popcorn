import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e) => {
    setIsLoading(false);
    e.target.src = 'https://via.placeholder.com/300';
  };

  return (
    <div className='w-full flex flex-col justify-between rounded overflow-hidden shadow-lg'>
      <div className={`relative w-full h-48 bg-gray-200 ${isLoading ? 'animate-pulse' : ''}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className='absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500'
          onLoad={(e) => {
            e.target.style.opacity = 1;
            handleImageLoad();
          }}
          onError={handleImageError}
        />
      </div>

      <div className='px-4 py-4 flex flex-1 flex-col justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-lg max-w-full text-ellipsis overflow-hidden whitespace-nowrap'>{product.name}</h2>

          <p className='text-gray-700 text-sm max-w-full overflow-hidden text-ellipsis line-clamp-2'>{product.description}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold text-sm'>
            {product.price} {product.currency}
          </p>
          <Link to={`/products/${product.id}`} className='text-gray-800 hover:text-gray-900 font-bold underline text-sm'>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
