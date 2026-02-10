import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Dashbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="dashbar">
      <ul className="dashbar-links">
        <h2 className="nav-logo">Chronos.</h2>
        <Link to="/">
          <li><i className="bi bi-house-door"></i> Főoldal</li>
        </Link>
        <Link to="/listings">
          <li><i className="bi bi-card-list"></i> Hirdetések</li>
        </Link>
      </ul>

      <div className="dashbar-buttons">
        <div className="login-data">
          <p className="name">{user?.name || "Vendég"}</p>
          <p className="email">{user?.email || ""}</p>
        </div>
        
        <Link to="/profile">
          <i className="bi bi-person"></i> Profil
        </Link>

        <button className="logout" onClick={logout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </nav>
  );
}

export default Dashbar;