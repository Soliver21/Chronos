const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <h2 className="nav-logo">Chronos.</h2>
        <li><a href="#home">Főoldal</a></li>
        <li><a href="#listings">Hírdetések</a></li>
      </ul>
      <div className="nav-buttons">
        <div className="login-data">
            <p className="name">Hűtőszerekő Jani</p>
            <p className="email">janika@gmail.com</p>
        </div>
        <div className="profile">
            Profil
        </div>
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;