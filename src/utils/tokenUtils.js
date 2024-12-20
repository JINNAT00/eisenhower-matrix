// Utility functions to handle token storage in cookies

import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

// Store the token in cookies
export const storeToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: 'strict' });
};

// Get the token from cookies
export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

// Remove the token from cookies
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
