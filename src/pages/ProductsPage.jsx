import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { getAllProducts, addProduct } from '../components/Services/productsService';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Lazy-loaded components
const ProductCard = lazy(() => import('../components/Product/ProductCard'));
const AddProductModal = lazy(() => import('../components/Product/AddProductModal'));

// ProductsPage Component
const ProductsPage = () => {
  // State for managing products data, pagination, sorting, and filtering
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('price-asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const productsPerPage = 16;
  const filteredProductsPerPage = 16;

  // Fetch products from the server on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  // Sorting products based on the selected criteria
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    const [criteria, order] = sortCriteria.split('-');
    if (criteria === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (criteria === 'name') {
      return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Filtering products based on the selected category
  const filterProductsByCategory = (category) => {
    if (category === 'all') {
      return sortedProducts;
    } else {
      return sortedProducts.filter((product) => product.category === category);
    }
  };

  // Handle page change event
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Calculate pagination parameters and select filtered products for the current page
  const offset = currentPage * productsPerPage;
  const filteredProducts = filterProductsByCategory(selectedCategory);
  const pageCount = Math.ceil(filteredProducts.length / filteredProductsPerPage);
  const currentFilteredProducts = filteredProducts.slice(offset, offset + filteredProductsPerPage);

  // Handle sorting by criteria
  const handleSortBy = (criteria) => {
    setSortCriteria(criteria);
    setIsDropdownOpen(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle adding a new product
  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      setProducts([...products, newProduct]);
      setIsModalOpen(false);

      // Use SweetAlert2 for a custom and visually appealing alert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully!',
      });

    } catch (error) {
      console.error('Error adding product:', error);

      // Use SweetAlert2 for an error alert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error adding product. Please try again.',
      });
    }
  };

  // Categories for filtering
  const categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
  ];

  // Render the ProductsPage component
  return (
    <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-16">
      {/* Sorting and Filtering Controls */}
      <div className="mb-4 flex flex-wrap items-start">
        {/* Sorting Dropdown */}
        <div className="relative w-full md:w-40 xl:w-48 mr-3">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full border border-ffc000 p-4 rounded-md shadow-md hover:shadow-lg"
            onClick={toggleDropdown}
          >
            Sort by
          </button>
          {isDropdownOpen && (
            <div className="origin-top-left absolute left-0 mt-2 w-full md:w-40 xl:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1" role="none">
                <button
                  onClick={() => handleSortBy('price-asc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  Price (Ascending)
                </button>
                {/* ... (similar buttons for other sorting criteria) */}
              </div>
            </div>
          )}
        </div>
        {/* Category Dropdown */}
        <div className="relative w-full md:w-40 xl:w-48 mr-3">
          <select
            className="relative w-full md:w-40 xl:w-48 mr-3 block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Browse Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* Spacer */}
        <div className="flex-grow"></div>
        {/* Add Product Button */}
        <div className="w-full md:w-40 xl:w-48">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-full border border-ffc000 p-4 rounded-md shadow-md hover:shadow-lg"
          >
            Add new product
          </button>
        </div>
      </div>

      {/* Display Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentFilteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            {/* Lazy-loaded ProductCard */}
            <Suspense fallback={<div>Processing ...</div>}>
              <ProductCard
                title={product.title}
                price={product.price}
                description={product.description}
                image={product.image}
                category={product.category}
              />
            </Suspense>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <ReactPaginate
          // ... (pagination configuration)
        />
      </div>

      {/* Lazy-loaded AddProductModal */}
      <Suspense fallback={<div>Loading...</div>}>
        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProduct={handleAddProduct} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
