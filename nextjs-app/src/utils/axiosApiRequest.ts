import axios, { AxiosError } from 'axios';

export const apiRequest = async (config: any) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Handle 401 Unauthorized errors
      if (axiosError.response?.status === 401) {
        // For verify-cookie endpoint, don't throw error
        if (config.url?.includes('verify-cookie')) {
          return { loggedIn: false, user: null };
        }
        throw new Error('Unauthorized access');
      }

      // Handle other errors
      throw new Error(
        (axiosError.response?.data as { message?: string })?.message ||
        axiosError.message ||
        'API Error'
      );
    }
    throw error;
  }
};
