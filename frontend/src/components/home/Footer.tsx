import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const borderCls = isDark ? "border-white/5" : "border-gray-200";
  const colTitleCls = isDark ? "text-white" : "text-gray-900";
  const linkCls = isDark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-gray-900";
  const descCls = isDark ? "text-gray-500" : "text-gray-400";
  const copyCls = isDark ? "text-gray-600" : "text-gray-400";

  return (
    <footer className={`border-t mt-8 px-4 sm:px-8 pt-12 pb-6 ${borderCls}`}>
      <div className="max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-3">
              Chronos
            </div>
            <p className={`text-sm leading-relaxed max-w-xs ${descCls}`}>
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
              <h4 className={`text-sm font-semibold mb-4 ${colTitleCls}`}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={`text-sm transition-colors ${linkCls}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={`border-t pt-6 text-center text-sm ${borderCls} ${copyCls}`}>
        © 2026 Chronos. Minden jog fenntartva.
      </div>
    </footer>
  );
};

export default Footer;