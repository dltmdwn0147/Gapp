import React from 'react';
import { UserInfo } from '../data/usersData';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  setUserInfo: () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
});
