import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { authStatus } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({reducer, initialState, children}) => {
  const [authState, setAuthState] = useState({});
  useEffect(() => {
    authStatus((user) => {
      setAuthState({ hasAuthStatus: true, isAuthenticated: !!user, user });
    });
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {authState.hasAuthStatus && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
