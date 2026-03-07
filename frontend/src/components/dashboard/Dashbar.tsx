import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f14]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-14">

        {/* Logo */}
        <div className="flex items-center gap-6">
          <h2
            className="text-xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent cursor-pointer select-none"
            onClick={() => { navigate("/"); setOpen(false); }}
          >
            Chronos.
          </h2>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-gray-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
              <i className="bi bi-house-door" /> Főoldal
            </Link>
            <Link to="/listings" className="text-gray-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
              <i className="bi bi-card-list" /> Hirdetések
            </Link>
          </div>
        </div>

        {/* Desktop jobb oldal */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-white">{user?.name || "Vendég"}</p>
            <p className="text-xs text-gray-500">{user?.email || ""}</p>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <i className="bi bi-person" /> Profil
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
          >
            <i className="bi bi-box-arrow-right" /> Logout
          </button>
        </div>

        {/* Hamburger – md alatt */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menü */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-[#0f0f14] border-t border-white/5 px-4 pb-4 space-y-1">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors">
            <i className="bi bi-house-door" /> Főoldal
          </Link>
          <Link to="/listings" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors">
            <i className="bi bi-card-list" /> Hirdetések
          </Link>

          <div className="pt-2 border-t border-white/5">
            <div className="px-3 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(user?.name || "?")[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">{user?.name}</p>
                <p className="text-xs text-gray-500 leading-tight">{user?.email}</p>
              </div>
            </div>
            <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors">
              <i className="bi bi-person" /> Profil
            </Link>
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