import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LoadingIcon } from '../../svg/LoadingIcon';

function Modal({ isOpen, onClose, children, loading = false }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50' onClick={handleClickOutside}>
      <div ref={modalRef} className='relative bg-white p-6 rounded shadow w-1/3'>
        {loading && (
          <div className='absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10'>
            <LoadingIcon className='w-10 h-10' />
          </div>
        )}

        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
