import { useTheme } from "../../context/ThemeContext";

const footerLinks = [
  { title: "Termék", links: ["Funkciók", "Árazás", "Biztonság", "Fejlesztési terv"] },
  { title: "Erőforrások", links: ["Dokumentáció", "API referencia", "Közösség", "Támogatás"] },
  { title: "Cég", links: ["Rólunk", "Blog", "Karrier", "Kapcsolat"] },
];

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t px-4 sm:px-8 pt-16 pb-8 transition-colors duration-300 ${
      isDark
        ? "border-white/6 bg-black/30 backdrop-blur-sm"
        : "border-gray-200 bg-gray-50"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand, egy rövid tájékoztató rólunk + */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl font-extrabold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-4">
              Chronos.
            </div>
            <p className={`text-sm leading-relaxed max-w-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Modern peer-to-peer piactér, amely a bizalomra, átláthatóságra és a
              közösség által vezérelt cserére épül.
            </p>
          </div>

          {/* Link oszlopok */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={`text-sm transition-colors duration-200 ${
                      isDark ? "text-gray-600 hover:text-gray-200" : "text-gray-400 hover:text-gray-700"
                    }`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alsó sáv */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? "border-white/5" : "border-gray-200"
        }`}>
          <p className={`text-xs ${isDark ? "text-gray-700" : "text-gray-400"}`}>
            © 2026 Chronos. Minden jog fenntartva.
          </p>
          <div className="flex items-center gap-5">
            {["Adatvédelem", "Feltételek", "Sütik"].map((item) => (
              <a key={item} href="#" className={`text-xs transition-colors ${
                isDark ? "text-gray-700 hover:text-gray-400" : "text-gray-400 hover:text-gray-700"
              }`}>
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