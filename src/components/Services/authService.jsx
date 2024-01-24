import axios from 'axios';

const baseURL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL,
});

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
