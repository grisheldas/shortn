import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext<any>(null);

export const UrlState = () => {
  return useContext(UrlContext);
};

const UrlProvider = ({ children }: any) => {
  const { data: user, loading, execute: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, loading, fetchUser, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export default UrlProvider;
