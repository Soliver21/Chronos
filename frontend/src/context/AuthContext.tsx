import React, { createContext, useContext, useState, useEffect } from 'react';

//interface auth context típusához definiáljuk a típust, hogy milyen értékeket és függvényeket tartalmaz majd a context.

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Létrehozzuk az AuthContext-et, amely a fenti típusú értékeket fogja !!!!tartalmazni!!!!. Kezdetben undefined-ként inicializáljuk, hogy jelezzük, hogy még nincs érték hozzárendelve.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//Hookok
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Ez a függvény elmenti a felhasználói adatokat és a token-t a localStorage-be, valamint frissíti a state-et is.
  const login = (userData: any, token: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
  };
  // Ez a függvény eltávolítja! a felhasználói adatokat és a token-t a localStorage-ből, valamint törli a state-et is, ezzel kijelentkeztetve (logout gombhoz majd) a felhasználót.
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  //Lásd main.tsx-ben, hogy a AuthProvider körbeveszi az App-et, így minden komponens, ami az App-ben van, hozzáférhet a context értékeihez kvázi globális.
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Saját hook, hogy könnyen hozzáférhessünk a context értékeihez a komponenseinkben. Ellenőrzi, hogy a context nem undefined-e, és ha igen, akkor hibát dob, jelezve, hogy a useAuth csak AuthProvider-en belül használható.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

/* Magyarázat a createContext/useContext és a provider objektum metódushoz példával  
1. LÉPÉS: Létrehozzuk a csatornát (fájl: UserContext.ts)
export const UserContext = createContext<string>("Vendég");

2. LÉPÉS: Sugárzunk (fájl: App.tsx)
function App() {
  return (
    <UserContext.Provider value="Gyetvai Ádám">
      <Layout />  (A Layout nem is tudja, mi az a UserContext, csak átengedi)
    </UserContext.Provider>
  );
}

3. LÉPÉS: Vesszük az adást (fájl: ProfileCard.tsx)
function ProfileCard() {
 VIZUÁLISAN: Benyúlunk a "térbe" és kihalásszuk a UserContext értékét.
 Nincs szükség props-ra!
  
  const userName = useContext(UserContext); 

  return <h1>Üdv, {userName}!</h1>;
} 
 */