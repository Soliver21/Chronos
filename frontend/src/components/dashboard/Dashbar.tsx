import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="dashbar">
      <ul className="dashbar-links">
        <h2 className="nav-logo">Chronos.</h2>
        <Link to="/">
        <li><a href="#home"><i className="bi bi-house-door"></i> Főoldal</a></li>
        </Link>
        <Link to="/listings">
        <li><a href="#listings">Hirdetések</a></li>
        </Link>
      </ul>
      <div className="dashbar-buttons">
        <div className="login-data">
            <p className="name">Hűtőszerekő Jani</p>
            <p className="email">janika@gmail.com</p>
        </div>
        <Link to="/profile">
            <i className="bi bi-person"> Profil</i>
        </Link>
        <button className="logout"><i className="bi bi-box-arrow-right"></i> Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;