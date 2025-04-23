
import { createContext, useState, useContext, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  matricNumber?: string;
  level?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, role: "student" | "teacher") => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const isAuthenticated = !!user;

  // Mock login function - in a real app this would connect to a backend
  const login = async (email: string, password: string, role: "student" | "teacher"): Promise<boolean> => {
    // For demo purposes, we'll just accept any email/password
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0], // Just using part of the email as a mock name
        email,
        role,
        matricNumber: role === "student" ? "SW" + Math.floor(Math.random() * 10000) : undefined,
        level: role === "student" ? "300L" : undefined,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Mock register function
  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a new user with an ID
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        ...userData,
      };

      // Remove password from the stored user object
      const { password, ...userWithoutPassword } = newUser as any;

      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
