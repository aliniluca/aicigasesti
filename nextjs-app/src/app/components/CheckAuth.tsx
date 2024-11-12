// src/app/components/CheckAuth.tsx
'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUser } from '@/Redux/authSlice';
import { apiRequest } from '@/utils/axiosApiRequest';
import { usePathname } from 'next/navigation';
import { protectedRoutes } from '@/config/routesConfig';

interface CheckAuthProps {
  onAuthComplete: () => void;
}

const CheckAuth = ({ onAuthComplete }: CheckAuthProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkUserAuth = async () => {
      // Only check auth for protected routes or if there's a cookie present
      const isProtectedRoute = protectedRoutes.includes(pathname);

      try {
        const response = await apiRequest({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL_VERIFY_COOKIE}`,
          useCredentials: true,
        });

        if (response.loggedIn) {
          dispatch(setLoggedIn(true));
          dispatch(setUser(response.user));
        } else {
          dispatch(setLoggedIn(false));
          dispatch(setUser(undefined));
        }
      } catch (error) {
        // Handle 401 errors silently for non-protected routes
        if (!isProtectedRoute) {
          dispatch(setLoggedIn(false));
          dispatch(setUser(null));
        } else {
          console.error('Error checking user auth:', (error as Error).message);
          dispatch(setLoggedIn(false));
          dispatch(setUser(null));
        }
      } finally {
        setLoading(false);
        onAuthComplete();
      }
    };

    checkUserAuth();
  }, [dispatch, onAuthComplete, pathname]);

  return null;
};

export default CheckAuth;
