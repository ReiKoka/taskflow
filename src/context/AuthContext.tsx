import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthenticatedUser } from "../utils/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseURL } from "../utils/constants";

export type AuthContext = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: AuthenticatedUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | undefined>>;
};

type AuthProviderPropTypes = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderPropTypes) => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [user, setUser] = useState<AuthenticatedUser | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode<{ sub: string }>(token);
          console.log(decoded)
          const res = await axios.get(`${baseURL}/users/${decoded.sub}`);
          const fetchedUser = res.data;
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user:", error);
          setToken("");
          setUser(undefined);
        }
      }
    };

    fetchUser(); // Call the function
  }, [token, setToken]);

  const contextValue = { user, setUser, token, setToken };

  return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export { AuthContext };
