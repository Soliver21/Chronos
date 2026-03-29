import { Github } from "lucide-react";

const footerLinks = [
  {
    title: "Termék",
    links: ["Funkciók", "Árazás", "Biztonság", "Fejlesztési terv"],
  },
  {
    title: "Erőforrások",
    links: ["Dokumentáció", "API referencia", "Közösség", "Támogatás"],
  },
  {
    title: "Cég",
    links: ["Rólunk", "Blog", "Karrier", "Kapcsolat"],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/6 px-4 sm:px-8 pt-16 pb-8 bg-black/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Chronos.
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-5">
              Modern peer-to-peer piactér, amely a bizalomra, átláthatóságra és a
              közösség által vezérelt cserére épül.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-300 transition-colors cursor-pointer"
            >
              <Github size={16} />
              <span className="text-xs">GitHub</span>
            </a>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">
            © 2026 Chronos. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-5">
            {["Adatvédelem", "Feltételek", "Sütik"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-700 hover:text-gray-400 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;