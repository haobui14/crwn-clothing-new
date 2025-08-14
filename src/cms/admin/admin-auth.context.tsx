import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AdminUser } from "../admin-auth.service";

interface AdminContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (admin: AdminUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to restore admin session from localStorage
    const restoreAdminSession = () => {
      try {
        const savedAdmin = localStorage.getItem("crwn-admin-session");
        if (savedAdmin) {
          const adminData = JSON.parse(savedAdmin);
          setAdmin(adminData);
        }
      } catch (error) {
        console.error("Error restoring admin session:", error);
        localStorage.removeItem("crwn-admin-session");
      } finally {
        setIsLoading(false);
      }
    };

    restoreAdminSession();
  }, []);

  const login = (adminUser: AdminUser) => {
    setAdmin(adminUser);
    // Save to localStorage (in a real app, you'd use secure storage)
    localStorage.setItem("crwn-admin-session", JSON.stringify(adminUser));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("crwn-admin-session");
  };

  const value: AdminContextType = {
    admin,
    isLoading,
    login,
    logout,
    isAuthenticated: admin !== null,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
