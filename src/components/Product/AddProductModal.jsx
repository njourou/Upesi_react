import React, { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
  };

  const handleCancel = () => {
    setNewProduct({
      title: '',
      price: '',
      category: '',
      description: '',
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'} overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isOpen ? 'sm:p-6' : 'sm:p-0'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Add a Product
            </h2>
            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="bg-pink-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
