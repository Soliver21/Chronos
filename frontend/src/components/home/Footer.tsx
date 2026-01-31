const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-brand">
      <div className="logo">Chronos</div>
      <p>
        Modern peer-to-peer piactér, amely a bizalomra,
        átláthatóságra és a közösség által vezérelt cserére épül.
      </p>
    </div>

    <div className="footer-links">
      <h4>Termék</h4>
      <ul>
        <li><a href="#">Funkciók</a></li>
        <li><a href="#">Árazás</a></li>
        <li><a href="#">Biztonság</a></li>
        <li><a href="#">Fejlesztési terv</a></li>
      </ul>
    </div>

    <div className="footer-links">
      <h4>Erőforrások</h4>
      <ul>
        <li><a href="#">Dokumentáció</a></li>
        <li><a href="#">API referencia</a></li>
        <li><a href="#">Közösség</a></li>
        <li><a href="#">Támogatás</a></li>
      </ul>
    </div>

    <div className="footer-links">
      <h4>Cég</h4>
      <ul>
        <li><a href="#">Rólunk</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Karrier</a></li>
        <li><a href="#">Kapcsolat</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2026 Chronos. Minden jog fenntartva.</p>
  </div>
</footer>

  )
}

export default Footer
