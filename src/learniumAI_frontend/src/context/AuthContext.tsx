import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  principal: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [principal, setPrincipal] = useState<string | null>(
    localStorage.getItem("principal")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const authenticated = await client.isAuthenticated();

      if (authenticated) {
        const identity = client.getIdentity();
        const principalId = identity.getPrincipal().toText();

        setIsAuthenticated(true);
        setPrincipal(principalId);

        // Simpan status ke LocalStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("principal", principalId);
      } else {
        setIsAuthenticated(false);
        setPrincipal(null);

        // Hapus dari LocalStorage jika tidak autentikasi
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("principal");
      }
    };

    initAuth();
  }, []);

  const login = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principalId = identity.getPrincipal().toText();

        setIsAuthenticated(true);
        setPrincipal(principalId);

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("principal", principalId);

        navigate("/dashboard");
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("principal");

    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ principal, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
