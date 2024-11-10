import axios from 'axios';

export const apiRequest = async (config: any) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true, // If your backend requires credentials
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || 'API Error');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server');
    } else {
      // Something else caused the error
      throw new Error(error.message);
    }
  }
};
