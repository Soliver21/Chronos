const Footer = () => (
  <footer className="border-t border-white/5 mt-8 px-4 sm:px-8 pt-12 pb-6">
    <div className="max-w-6xl mx-auto mb-10">

      {/* Grid: brand + 3 link oszlop egy sorban nagy képernyőn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="text-xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-3">
            Chronos
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Modern peer-to-peer piactér, amely a bizalomra, átláthatóságra és a közösség által vezérelt cserére épül.
          </p>
        </div>

        {/* Link oszlopok */}
        {[
          { title: "Termék", links: ["Funkciók", "Árazás", "Biztonság", "Fejlesztési terv"] },
          { title: "Erőforrások", links: ["Dokumentáció", "API referencia", "Közösség", "Támogatás"] },
          { title: "Cég", links: ["Rólunk", "Blog", "Karrier", "Kapcsolat"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-white/5 pt-6 text-center text-gray-600 text-sm">
      © 2026 Chronos. Minden jog fenntartva.
    </div>
  </footer>
);

export default Footer;