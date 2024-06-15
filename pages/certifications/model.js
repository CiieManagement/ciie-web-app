import React from 'react';

const Modal = ({ show, onClose, pdf }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 transform transition-transform duration-300 scale-95">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-black hover:text-gray-600">&times;</button>
        </div>
        <div className="p-4">
          <iframe src={pdf} className="w-full h-96 md:h-120" frameBorder="0"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Modal;
