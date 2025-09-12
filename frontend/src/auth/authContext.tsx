import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType } from "../types/auth";
import type { User } from "../types/user";

export const USER_STOREAGE_KEY = "auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const rawUser = localStorage.getItem(USER_STOREAGE_KEY);

    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser));
      } catch (e) {
        console.log(e);
        localStorage.removeItem(USER_STOREAGE_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (newUser: User): Promise<void> => {
    setUser(newUser);
    localStorage.setItem(USER_STOREAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STOREAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Reached useAuth out of context");

  return context;
};
