"use client"
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  data: any
}

const ModalEditar = ({ isOpen, onClose, children,data }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-20 p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className=" absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold cursor-pointer"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalEditar;
