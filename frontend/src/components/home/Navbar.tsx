import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const navBg = isDark
    ? "bg-[rgba(15,15,15,0.85)] border-white/5"
    : "bg-white/90 border-gray-200";
  const linkCls = isDark
    ? "text-gray-400 hover:text-white"
    : "text-gray-500 hover:text-gray-900";
  const mobileBg = isDark ? "bg-[#0f0f14] border-white/5" : "bg-white border-gray-100";
  const mobileLinkCls = isDark
    ? "text-gray-400 hover:text-white hover:bg-white/5"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
  const hamburgerColor = isDark ? "bg-gray-300" : "bg-gray-600";
  const userNameCls = isDark ? "text-gray-400" : "text-gray-500";
  const outlineBtnCls = isDark
    ? "border-white/10 text-gray-300 hover:bg-white/5"
    : "border-gray-200 text-gray-700 hover:bg-gray-100";

  const navLinks = [
    { href: "#features", label: "Funkciók" },
    { href: "#trustlvls", label: "Bizalmi szintek" },
    { href: "#about", label: "Rólunk" },
    { href: "#docs", label: "Dokumentáció" },
  ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">

        {/* Logo */}
        <h2
          className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent select-none"
          onClick={() => navigate("/")}
        >
          Chronos.
        </h2>

        {/* Desktop navigáció */}
        <ul className="hidden lg:flex gap-8 list-none">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={`text-sm font-medium transition-colors ${linkCls}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop gombok */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Témaváltó */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isDark ? "hover:bg-white/10 text-yellow-400" : "hover:bg-gray-100 text-indigo-600"
            }`}
            title={isDark ? "Váltás világos módra" : "Váltás sötét módra"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              <span className={`text-sm ${userNameCls}`}>
                Üdvözöljük, {user.name}!
              </span>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all"
              >
                Vezérlőpult
              </Link>
              <button
                onClick={logout}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${outlineBtnCls}`}
              >
                Kilépés
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all"
              >
                Bejelentkezés
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${outlineBtnCls}`}
              >
                Regisztráció
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü megnyitása"
        >
          <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobil menü */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className={`border-t px-4 pb-4 space-y-1 ${mobileBg}`}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${mobileLinkCls}`}
            >
              {label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm transition-colors ${mobileLinkCls}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? "Világos mód" : "Sötét mód"}
            </button>
            {user ? (
              <>
                <p className={`text-xs px-3 pt-1 ${userNameCls}`}>
                  Üdvözöljük, {user.name}!
                </p>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold"
                >
                  Vezérlőpult
                </Link>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className={`block w-full py-2.5 rounded-lg border text-sm font-semibold transition-colors ${outlineBtnCls}`}
                >
                  Kilépés
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold"
                >
                  Bejelentkezés
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-center py-2.5 rounded-lg border text-sm font-semibold transition-colors ${outlineBtnCls}`}
                >
                  Regisztráció
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;