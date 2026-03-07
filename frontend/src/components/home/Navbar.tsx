import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(15,15,15,0.85)] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <h2
          className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent select-none"
          onClick={() => navigate("/")}
        >
          Chronos.
        </h2>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {["#features", "#trustlvls", "#about", "#docs"].map((href, i) => (
            <li key={i}>
              <a
                href={href}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                {["Funkciók", "Bizalmi szintek", "Rólunk", "Dokumentáció"][i]}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-gray-400 text-sm">Szia, {user.name}</span>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Logout
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
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Regisztrálás
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0f0f14] border-t border-white/5 px-4 pb-4 space-y-1">
          {["#features", "#trustlvls", "#about", "#docs"].map((href, i) => (
            <a
              key={i}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {["Funkciók", "Bizalmi szintek", "Rólunk", "Dokumentáció"][i]}
            </a>
          ))}
          <div className="pt-2 border-t border-white/5 space-y-2">
            {user ? (
              <>
                <p className="text-gray-500 text-xs px-3 pt-1">Szia, {user.name}</p>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="block w-full py-2.5 rounded-lg border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  Logout
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
                  className="block w-full text-center py-2.5 rounded-lg border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  Regisztrálás
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
