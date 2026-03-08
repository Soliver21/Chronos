import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Dashbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";

  const isActive = (path: string) => location.pathname === path;

  const navBg = isDark ? "bg-[#0f0f14]/90 border-white/5" : "bg-white/90 border-gray-200";
  const nameCls = isDark ? "text-white" : "text-gray-900";
  const emailCls = isDark ? "text-gray-500" : "text-gray-500";
  const profileBtnCls = isDark ? "border-white/10 text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-100";
  const mobileBg = isDark ? "bg-[#0f0f14] border-white/5" : "bg-white border-gray-100";
  const hamburgerColor = isDark ? "bg-gray-300" : "bg-gray-600";

  // Nav link – aktív / nem aktív stílus
  const navLink = (path: string, label: string, icon: string) => {
    const active = isActive(path);
    const baseCls = "text-sm font-medium transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg";
    const activeCls = isDark
      ? "text-white bg-white/10 font-semibold"
      : "text-gray-900 bg-gray-100 font-semibold";
    const inactiveCls = isDark
      ? "text-gray-500 hover:text-white hover:bg-white/5"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100";
    return (
      <Link to={path} className={`${baseCls} ${active ? activeCls : inactiveCls}`}>
        <i className={`bi ${icon}`} />
        {label}
        {active && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />}
      </Link>
    );
  };

  // Mobil nav link
  const mobileNavLink = (path: string, label: string, icon: string) => {
    const active = isActive(path);
    const baseCls = "flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm transition-colors";
    const activeCls = isDark ? "text-white bg-white/10 font-semibold" : "text-gray-900 bg-gray-100 font-semibold";
    const inactiveCls = isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
    return (
      <Link to={path} onClick={() => setOpen(false)} className={`${baseCls} ${active ? activeCls : inactiveCls}`}>
        <i className={`bi ${icon}`} />
        {label}
        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />}
      </Link>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-14">

        {/* Logo + nav linkek */}
        <div className="flex items-center gap-2">
          <h2
            className="text-xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent cursor-pointer select-none mr-2"
            onClick={() => { navigate("/"); setOpen(false); }}
          >
            Chronos.
          </h2>
          <div className="hidden md:flex items-center gap-1">
            {navLink("/", "Főoldal", "bi-house-door")}
            {navLink("/dashboard", "Dashboard", "bi-speedometer2")}
            {navLink("/listings", "Hirdetések", "bi-card-list")}
          </div>
        </div>

        {/* Desktop jobb oldal */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isDark ? "hover:bg-white/10 text-yellow-400" : "hover:bg-gray-100 text-indigo-600"
            }`}
            title={isDark ? "Váltás világos módra" : "Váltás sötét módra"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="text-right leading-tight">
            <p className={`text-sm font-semibold ${nameCls}`}>{user?.name || "Vendég"}</p>
            <p className={`text-xs ${emailCls}`}>{user?.email || ""}</p>
          </div>

          <Link
            to="/profile"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              isActive("/profile")
                ? isDark ? "bg-white/10 border-white/20 text-white font-semibold" : "bg-gray-100 border-gray-300 text-gray-900 font-semibold"
                : profileBtnCls
            }`}
          >
            <i className="bi bi-person" /> Profil
            {isActive("/profile") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />}
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
          >
            <i className="bi bi-box-arrow-right" /> Logout
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menü */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
        <div className={`border-t px-4 pb-4 space-y-1 ${mobileBg}`}>
          {mobileNavLink("/", "Főoldal", "bi-house-door")}
          {mobileNavLink("/dashboard", "Dashboard", "bi-speedometer2")}
          {mobileNavLink("/listings", "Hirdetések", "bi-card-list")}

          <div className="pt-2 border-t border-white/5">
            <div className="px-3 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(user?.name || "?")[0].toUpperCase()}
              </div>
              <div>
                <p className={`text-sm font-semibold leading-tight ${nameCls}`}>{user?.name}</p>
                <p className={`text-xs leading-tight ${emailCls}`}>{user?.email}</p>
              </div>
            </div>
            {mobileNavLink("/profile", "Profil", "bi-person")}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm transition-colors ${
                isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? "Világos mód" : "Sötét mód"}
            </button>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="w-full mt-1 py-2.5 px-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold text-left transition-colors flex items-center gap-2"
            >
              <i className="bi bi-box-arrow-right" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Dashbar;