import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from './components/Auth/Login';
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProtectedRoute from './components/Utils/ProtectedRoute';

function App() {

  return (

    <div className="App">


      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route path="login" element={<LoginForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Route>


        </Routes>

        <Footer />
      </BrowserRouter>


    </div>
  )

}

export default App
