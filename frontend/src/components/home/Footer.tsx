import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { X } from "lucide-react";

const footerItems = [
  {
    col: "Platform",
    label: "Funkciók",
    title: "Platform funkciók",
    content: "A Chronos kreditalapú szolgáltatáscserére épül. Hirdetéseket adhatsz fel ajánlatként vagy keresletként, tranzakciókat indíthatsz más felhasználókkal, és értékelésekkel építheted a megbízhatóságodat. A rendszer escrow-mechanizmussal garantálja az egyenleg biztonságát minden tranzakció során.",
  },
  {
    col: "Platform",
    label: "Biztonság",
    title: "Biztonság és adatvédelem",
    content: "Jelszavaidat Argon2 algoritmussal titkosítjuk. A JWT-alapú hitelesítés minden védett végpontot véd, az escrow-tranzakciók Prisma $transaction blokkban futnak – hiba esetén automatikus rollback garantálja az adatkonzisztenciát. Személyes adataidat harmadik félnek nem adjuk ki.",
  },
  {
    col: "Platform",
    label: "Feltételek",
    title: "Felhasználási feltételek",
    content: "A Chronos használatával elfogadod, hogy a platformot rendeltetésszerűen használod. Tilos hamis hirdetéseket feladni, más felhasználókat megtéveszteni, vagy a kreditrendszert manipulálni. A szabályszegés a fiók azonnali felfüggesztését vonhatja maga után.",
  },
  {
    col: "Platform",
    label: "Kreditrendszer",
    title: "A Kreditrendszer működése",
    content: "A Chronos nem használ valódi pénzt vagy bankkártyát. A belső elszámolás alapja a Kredit. Regisztrációkor kezdőcsomagot kapsz, majd szolgáltatások nyújtásával szerezhetsz továbbiakat. Ez garantálja a platform nonprofit, közösségi jellegét és a biztonságos cserét.",
  },
  {
    col: "Közösség",
    label: "Rólunk",
    title: "A Chronos-ról",
    content: "A Chronos egy modern, webalapú közösségi piactér, amelyet három fejlesztő hozott létre vizsgaremekként a 2025/2026-os tanévben. Célunk egy átlátható, bizalomra épülő platform, ahol az emberek egyszerűen és biztonságosan cserélhetnek egymással szolgáltatásokat.",
  },
  {
    col: "Közösség",
    label: "Tudnivalók",
    title: "Hogyan használd a rendszert?",
    content: "Regisztrálj, és böngéssz az ajánlatok között. Ha találsz megfelelőt, kezdeményezz tranzakciót. A kreditek a teljesítésig egy biztonsági letétbe (escrow) kerülnek. Amint mindkét fél jóváhagyja a munkát, a kreditek átkerülnek a szolgáltatóhoz. Ne felejts el értékelést írni!",
  },
  {
    col: "Közösség",
    label: "Bizalmi szintek",
    title: "Bizalmi szint rendszer",
    content: "A Chronos automatikusan követi nyomon a tranzakcióidat:\n\n• Kezdő (0–4 tranzakció): itt indul mindenki\n• Megbízható (5–19 tranzakció): a közösség már számol veled\n• Veterán (20+ tranzakció): a platform legtapasztaltabb tagjai\n\nA szinted jelzi a megbízhatóságodat a többi felhasználó felé.",
  },
  {
    col: "Közösség",
    label: "Kapcsolat",
    title: "Kapcsolat",
    content: "Kérdésed, problémád vagy visszajelzésed van?\n\nEmail: chronos.project@gmail.com\n\nHibajelentésnél kérjük tüntesd fel a hiba pontos leírását. Igyekszünk 24 órán belül válaszolni.",
  },
];

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeItem, setActiveItem] = useState<(typeof footerItems)[0] | null>(null);

  const borderCls = isDark ? "border-white/6" : "border-gray-200";
  const footerBg = isDark ? "bg-black/30 backdrop-blur-sm" : "bg-gray-50";
  const colTitleCls = isDark ? "text-gray-400" : "text-gray-500";
  const linkCls = isDark ? "text-gray-600 hover:text-gray-200" : "text-gray-400 hover:text-gray-700";
  const copyCls = isDark ? "text-gray-700" : "text-gray-400";
  const modalBg = isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-gray-200";
  const modalTitleCls = isDark ? "text-white" : "text-gray-900";
  const modalTextCls = isDark ? "text-gray-400" : "text-gray-600";
  const closeBtnCls = isDark ? "text-gray-500 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100";

  // Frissített oszlopnevek
  const cols = ["Platform", "Közösség"];

  return (
    <>
      <footer className={`border-t px-4 sm:px-8 pt-16 pb-8 transition-colors duration-300 ${borderCls} ${footerBg}`}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 mb-12 items-start justify-items-center sm:justify-items-start">

            <div className="text-center sm:text-left">
              <div className="text-xl font-extrabold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-4">
                Chronos.
              </div>
              <p className={`text-sm leading-relaxed max-w-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                Modern peer-to-peer piactér, amely a bizalomra, átláthatóságra és a
                közösség által vezérelt cserére épül.
              </p>
            </div>

            {cols.map((col) => (
              <div key={col} className="text-center sm:text-left">
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-5 ${colTitleCls}`}>
                  {col}
                </h4>
                <ul className="space-y-3">
                  {footerItems
                    .filter((item) => item.col === col)
                    .map((item) => (
                      <li key={item.label}>
                        <button
                          onClick={() => setActiveItem(item)}
                          className={`text-sm transition-colors duration-200 text-left cursor-pointer ${linkCls}`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 ${borderCls}`}>
            <p className={`text-xs ${copyCls}`}>
              © 2026 Chronos. Minden jog fenntartva.
            </p>
          </div>
        </div>
      </footer>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 ${modalBg}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className={`text-lg font-bold pr-4 ${modalTitleCls}`}>
                {activeItem.title}
              </h2>
              <button
                onClick={() => setActiveItem(null)}
                className={`flex-shrink-0 p-1.5 rounded-lg transition-colors cursor-pointer ${closeBtnCls}`}
                aria-label="Bezárás"
              >
                <X size={18} />
              </button>
            </div>

            <div className={`text-sm leading-relaxed whitespace-pre-line ${modalTextCls}`}>
              {activeItem.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;