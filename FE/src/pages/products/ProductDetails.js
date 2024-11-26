import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import DeleteModal from '../../components/Modals/DeleteModal';
import { LoadingIcon } from '../../svg/LoadingIcon';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const productData = response.data.data;
        setProduct(productData);
        setMainImage(productData.images[0]);
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/products/${id}`);
      setShowModal(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
        <LoadingIcon className='w-12 h-12' />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className='w-full mx-auto mt-8 p-4 border rounded shadow flex flex-col lg:flex-row gap-8'>
      <div className='w-full lg:w-1/2'>
        <div className='relative w-full h-96 rounded-lg overflow-hidden'>
          <img src={mainImage} alt={product.name} className='w-full h-full object-cover' />
        </div>
        <div className='mt-4 p-2 flex gap-2 overflow-x-auto'>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className={`w-20 h-20 object-cover cursor-pointer rounded ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>

      <div className='w-full lg:w-1/2 flex flex-col justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{product.name}</h2>
          <p className='mt-2'>{product.description}</p>
          <p className='mt-2 font-semibold'>
            {product.price} {product.currency}
          </p>
          <div className='mt-4'>
            <h3 className='font-bold'>Attributes:</h3>
            {Object.entries(product.customAttributes).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
        <div className='mt-6 flex gap-4 justify-end'>
          <Link to={`/products/edit/${id}`} className='p-2 bg-gray-800 text-white w-20 text-center rounded hover:bg-gray-900'>
            Edit
          </Link>
          <button onClick={() => setShowModal(true)} className='p-2 bg-red-700 text-white w-20 text-center rounded hover:bg-red-800' disabled={deleteLoading}>
            Delete
          </button>
        </div>
      </div>

      <DeleteModal isOpen={showModal} onClose={() => setShowModal(false)} onDelete={handleDelete} loading={deleteLoading} />
    </div>
  );
}

export default ProductDetails;
