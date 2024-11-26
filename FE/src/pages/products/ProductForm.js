import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    images: [],
    category: '',
    customAttributes: [],
  });

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/products/${id}`)
        .then((response) => {
          const productData = response.data.data;
          const customAttributes = Object.entries(productData.customAttributes || {}).map(([key, value], index) => ({ id: index, key, value }));
          setProduct({ ...productData, customAttributes });
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          toast.error('Error fetching product');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCustomAttributeChange = (id, field, value) => {
    const updatedAttributes = product.customAttributes.map((attr) => (attr.id === id ? { ...attr, [field]: value } : attr));
    setProduct({ ...product, customAttributes: updatedAttributes });
  };

  const addImage = () => {
    setProduct({
      ...product,
      images: [...product.images, ''],
    });
  };

  const updateImage = (index, value) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct({ ...product, images: updatedImages });
  };

  const removeImage = (index) => {
    if (product.images.length === 1) {
      toast.error('At least one image is required');
      return;
    }
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const addCustomAttribute = () => {
    setProduct({
      ...product,
      customAttributes: [...product.customAttributes, { id: Date.now(), key: '', value: '' }],
    });
  };

  const removeCustomAttribute = (id) => {
    const updatedAttributes = product.customAttributes.filter((attr) => attr.id !== id);
    setProduct({ ...product, customAttributes: updatedAttributes });
  };

  const validateForm = () => {
    if (!product.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!product.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!product.category.trim()) {
      toast.error('Category is required');
      return false;
    }
    if (!product.price || isNaN(product.price) || product.price <= 0) {
      toast.error('Price must be a positive number');
      return false;
    }
    if (product.images.length === 0 || product.images.some((image) => !image.trim())) {
      toast.error('At least one valid image URL is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const customAttributes = product.customAttributes.reduce((acc, attr) => {
      if (attr.key) acc[attr.key] = attr.value;
      return acc;
    }, {});

    const productToSubmit = { ...product, customAttributes };

    const request = id ? axiosInstance.put(`/products/${id}`, productToSubmit) : axiosInstance.post(`/products`, productToSubmit);

    request
      .then(() => {
        toast.success('Product saved successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error saving product:', error);
        toast.error('Error saving product');
      });
  };

  return (
    <div className='w-full mx-auto mt-8 p-4 border rounded shadow'>
      <h2 className='text-2xl font-bold mb-3'>{id ? 'Edit Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Name' value={product.name} onChange={handleChange} className='w-full p-2 border rounded mb-4' required />
        <textarea name='description' placeholder='Description' value={product.description} onChange={handleChange} className='w-full p-2 border rounded mb-4' required />
        <input type='number' name='price' placeholder='Price' value={product.price} onChange={handleChange} className='w-full p-2 border rounded mb-4' required />
        <input type='text' name='category' placeholder='Category' value={product.category} onChange={handleChange} className='w-full p-2 border rounded mb-4' required />
        <div>
          <h3 className='font-bold mb-2'>Images</h3>
          {product.images.map((image, index) => (
            <div key={index} className='flex items-center mb-2'>
              <input type='text' placeholder='Image URL' value={image} onChange={(e) => updateImage(index, e.target.value)} className='p-2 border rounded mr-2 flex-grow' />
              <button type='button' onClick={() => removeImage(index)} className='text-red-500 hover:underline'>
                Remove
              </button>
            </div>
          ))}
          <button type='button' onClick={addImage} className='text-gray-800 underline hover:underline'>
            Add Image
          </button>
        </div>
        <div>
          <h3 className='font-bold mb-2'>Custom Attributes</h3>
          {product.customAttributes.map(({ id, key, value }) => (
            <div key={id} className='flex items-center mb-2'>
              <input type='text' placeholder='Key' value={key} onChange={(e) => handleCustomAttributeChange(id, 'key', e.target.value)} className='p-2 border rounded mr-2 flex-grow' />
              <input type='text' placeholder='Value' value={value} onChange={(e) => handleCustomAttributeChange(id, 'value', e.target.value)} className='p-2 border rounded mr-2 flex-grow' />
              <button type='button' onClick={() => removeCustomAttribute(id)} className='text-red-500 hover:underline'>
                Remove
              </button>
            </div>
          ))}
          <button type='button' onClick={addCustomAttribute} className='text-gray-800 underline hover:underline'>
            Add Attribute
          </button>
        </div>
        <button type='submit' className='mt-4 p-2 bg-gray-800 text-white w-20 rounded hover:bg-gray-900'>
          Save
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
