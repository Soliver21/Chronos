import { Link } from "react-router-dom";
import chronos_logo from '../../img/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="trade-name">
        <h2 className="nav-logo">Chronos</h2>
        <img src={chronos_logo} alt="Chronos Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#features">Funkciók</a></li>
        <li><a href="#trustlvls">Bizalmi szintek</a></li>
        <li><a href="#about">Rólunk</a></li>
        <li><a href="#docs">Dokumentáció</a></li>
      </ul>
      <div className="nav-buttons">
        <Link to="/login" className="btn btn-primary">
          Bejelentkezés
        </Link>
        
        <Link to="/register" className="btn">
          Regisztrálás
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;