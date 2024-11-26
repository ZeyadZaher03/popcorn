import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/Products/ProductCard';
import SearchForm from '../../components/Products/ProductSearchForm';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/products/search', {
        params: filters,
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <SearchForm onSearch={fetchProducts} />
      <div className='grid grid-cols-4 gap-5'>
        {products.length > 0 ? products.map((product) => <ProductCard key={product.id} product={product} />) : <p className='text-center mt-8'>No products found.</p>}
      </div>
    </>
  );
}

export default ProductList;
