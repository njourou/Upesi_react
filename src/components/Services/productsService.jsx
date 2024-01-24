import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateProduct = async (productId, updatedData) => {
  console.log("UPDATING PRODUCT",productId);
  try {
    const response = await axios.patch(`${BASE_URL}/${productId}`, updatedData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  console.log("DELETEING PRODUCT",productId);
  try {
   const response= await axios.delete(`${BASE_URL}/${productId}`);
   console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (product) => {
  console.log("ADDING PRODUCT",product);
  try {
    const response = await axios.post(BASE_URL, product);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw error;
  }
};
