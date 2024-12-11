import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {children}
                <button onClick={onClose} className="mt-4 px-5 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-200">
                    ปิด
                </button>
            </div>
        </div>
    );
};

export default Modal;
