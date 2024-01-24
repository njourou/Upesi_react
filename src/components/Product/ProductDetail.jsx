import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getProductDetails, updateProduct, deleteProduct } from '../Services/productsService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditProductForm from './EditProductForm';
import Swal from 'sweetalert2';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    category: '',
    description: '',
    rating: {
      "rate": 0,
      "count": 0
    }
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
        setFormData({
          title: data.title,
          price: data.price,
          category: data.category,
          description: data.description,
          rating: data.rating.rate

        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    fetchProductDetails();
  }, [id]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateProduct(id, formData);
      if (updatedData.image) {
        setProduct(updatedData);
      } else {
        setProduct({ ...updatedData, image: product.image });
      }
  
      // Use SweetAlert2 success message
      await Swal.fire({
        icon: 'success',
        title: 'Product updated successfully!',
        showConfirmButton: false,
        timer: 1500, // Adjust the timer as needed
      });
  
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
  
      // Use SweetAlert2 error message
      await Swal.fire({
        icon: 'error',
        title: 'Error updating product',
        text: 'Please try again later.',
      });
    }
  };
  

  const handleDelete = async () => {
    try {
      // Use SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Do you want to delete this product?',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary ml-2',
        },
      });
  
      if (result.isConfirmed) {
        await deleteProduct(id);
        // Use SweetAlert2 success message
        Swal.fire('Product deleted successfully!', '', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Use SweetAlert2 error message
      Swal.fire('Error deleting product', 'Please try again later.', 'error');
    }
  };

  if (!product) {
    return <section className="h-screen text-center justify-center">Loading...</section>;
  }

  return (
    <div className=" pt-10 pb-12 lg:py-32 h-screen flex items-center">

      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0 '>
            <img className='max-h-[400px] lg:max-w-sm hover:scale-110 transition duration-300' src={product.image} alt={product.title} />
          </div>

          <div className='flex-1 text-center lg:text-left'>
       
            <h1 className='text-[26px] font-bold mb-2 max-w-[450px] mx-auto lg:mx-0'>{product.title}</h1>
            <h1 className='uppercase font-bold text-blue-400'>CATEGORY : {product.category}</h1>
            <div className='text-xl text-green-400 font-medium mb-6'>${product.price}</div>
         
            <div className='max-w-[500px]'>
              <p className='mb-5'>{product.description}</p>
            </div>

            {!showUpdateForm ? (
            <div className="flex">
              <button
                className="bg-gray-400 hover:bg-black-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowUpdateForm(true)}>UPDATE</button>
              <button
                className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={handleDelete}>
                  DELETE
               
              </button>
            </div>
          ) : (

            <EditProductForm
                product={product}
                formData={formData}
                showUpdateForm={showUpdateForm}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            // <form onSubmit={handleSubmit}>
            //   <div className="mb-4">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            //       Title
            //     </label>
            //     <input
            //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[500px]"
            //       id="title"
            //       type="text"
            //       name="title"
            //       value={formData.title}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <div className="mb-4">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            //       Price
            //     </label>
            //     <input
            //       className=" max-w-[500px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            //       id="price"
            //       type="number"
            //       name="price"
            //       value={formData.price}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <div className="mb-4">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            //       Category
            //     </label>
            //     <input
            //       className="max-w-[500px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            //       id="category"
            //       type="text"
            //       name="category"
            //       value={formData.category}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <div className="mb-4 max-h-[200px]">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            //       Description
            //     </label>
            //     <textarea
            //       className="max-w-[500px] h-44 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            //       id="description"
            //       name="description"
            //       value={formData.description}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <button
            //     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            //     type="submit"
            //   >
            //     Update Product
            //   </button>
            // </form>
          )}
            
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;