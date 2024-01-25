import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { FaSearch, FaFilter } from "react-icons/fa";
import AddProductModal from '../../components/Product/AddProductModal';


const Navbar = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.innerWidth >= 768
  );
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      dispatch(logout());
    }

    window.location.href = "/login";
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setSearchQuery("");
  };

  const handleFilter = () => {
    // Add your filter logic here
    console.log("Filtering...");
  };

  const handleAccountDropdown = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      setProducts([...products, newProduct]);
      setIsModalOpen(false);
      alert('New product Added!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
   
    return null;
  }

  return (
    <div className="mb-40">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:py-8">
          <div>
            <a href="/" className="flex items-center">
              <img
                src="/src/assets/logo.png"
                className="h-12 mr-3"
                alt="Upesi"
              />
            </a>
          </div>

          <div className="flex items-center">
            <div className="relative flex items-stretch">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-pink-300 rounded-md p-2 mr-1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <button
                  className="text-gray-500"
                  onClick={() => handleSearch(searchQuery)}
                >
                  <FaSearch />
                </button>
              </div>
            </div>
            <button
              className="bg-gray-500 text-white px-8 py-2 rounded-md border border-gray-200 p-4 rounded-md shadow-md hover:shadow-lg flex items-center"
              onClick={() => handleFilter()}
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>

          {isLargeScreen && (
            <div className="md:order-3">
              <div className="flex items-center space-x-4">
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="bg-gray-800 py-2 px-6 rounded-md text-white font-medium border border-ffc000 p-4 rounded-md shadow-md hover:shadow-lg"
                    onClick={handleAccountDropdown}
                  >
                    My Account
                  </button>

                  {isMobileMenuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <button
            onClick={() => setIsModalOpen(true)}
            
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Add Product
          </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
          )}
          
        </div>
      </nav>
      <main>{props.children}</main>
      
    </div>
    
    
  );
};

export default Navbar;
