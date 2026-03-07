import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from "../services/api";

// interface auth context típusához definiáljuk a típust, hogy milyen értékeket és függvényeket tartalmaz majd a context.
interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// Létrehozzuk az AuthContext-et, amely a fenti típusú értékeket fogja tartalmazni.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Hookok a felhasználó és a token tárolására
  
  // JAVÍTÁS: A useState-en BELÜL azonnal kiolvassuk a localStorage-ot. 
  // Így az oldal frissítésekor (F5) nem lesz "üres" pillanat, a React egyből tudja, ki vagy.
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);

  // Ez a függvény elmenti a felhasználói adatokat és a token-t a localStorage-be, 
  // frissíti a state-et, és beállítja az API globális fejlécét.
  const login = (userData: any, token: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
  };

  // Ez a függvény eltávolítja a felhasználói adatokat és a token-t a localStorage-ből, 
  // törli a state-et és az API fejlécet, majd átirányít a login oldalra.
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  // Lásd main.tsx-ben: az AuthProvider körbeveszi az App-et, 
  // így minden komponens hozzáférhet ezekhez a globális értékekhez.
  return (
    <AuthContext.Provider value={{ 
        user, 
        token, 
        login, 
        logout, 
        isAuthenticated: !!token,
        loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Saját hook a context használatához. Ellenőrzi, hogy a provider-en belül vagyunk-e.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};