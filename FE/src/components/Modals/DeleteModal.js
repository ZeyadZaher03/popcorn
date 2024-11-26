import React from 'react';
import Modal from './Modal';

function DeleteModal({ isOpen, onClose, onDelete, loading }) {
  return (
    <Modal loading={loading} isOpen={isOpen} onClose={onClose}>
      <h2 className='text-lg font-bold'>Confirm Delete</h2>
      <p className='mt-2'>Are you sure you want to delete this product?</p>
      <div className='mt-4 flex justify-end'>
        <button disabled={loading} onClick={onClose} className='font-bold p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2'>
          Cancel
        </button>
        <button disabled={loading} onClick={onDelete} className='font-bold p-2 bg-red-700 text-white rounded hover:bg-red-800'>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
