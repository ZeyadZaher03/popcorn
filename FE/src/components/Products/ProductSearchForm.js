import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ q: query });
  };

  return (
    <form onSubmit={handleSubmit} className='p-4  bg-gray-50 flex gap-2 shadow-md rounded-md max-full'>
      <input
        type='text'
        name='q'
        placeholder='Search products (name, category, custome attributes)...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm'
      />
      <button type='submit' className='p-2 w-20 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm'>
        Search
      </button>
    </form>
  );
}

export default SearchForm;
