import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2 className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Chronos.
      </h2>
      
      <ul className="nav-links">
        <li><a href="#features">Funkciók</a></li>
        <li><a href="#trustlvls">Bizalmi szintek</a></li>
        <li><a href="#about">Rólunk</a></li>
        <li><a href="#docs">Dokumentáció</a></li>
      </ul>
          
      <div className="nav-buttons">
        {user ? (
            /* BEJELENTKEZETT ÁLLAPOT*/
          <>
            <span style={{ color: '#a0a0a0', marginRight: '1rem', alignSelf: 'center' }}>
              Szia, {user.name}
            </span>
            <Link to="/dashboard" className="btn btn-primary">
              Dashboard
            </Link>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          /* KIJELENTKEZETT ÁLLAPOT */
          <>
            <Link to="/login" className="btn btn-primary">
              Bejelentkezés
            </Link>
            <Link to="/register" className="btn">
              Regisztrálás
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;