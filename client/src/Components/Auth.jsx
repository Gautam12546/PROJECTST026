import React from 'react';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const [cookies] = useCookies(['token']);

  if (!cookies.token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(cookies.token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;
