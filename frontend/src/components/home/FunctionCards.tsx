import { useTheme } from "../../context/ThemeContext";

const cards = [
  { icon: "📦", title: "Intelligens hirdetések", description: "Hozzon létre kínálatokat vagy kereséseket részletes leírással és kategóriákkal. Az automatikus párosítás segít gyorsan egymásra találni." },
  { icon: "⚡", title: "Azonnali tranzakciók", description: "Bonyolítsa le a cseréket gyorsan és egyszerűen. Kövesse nyomon az állapotot a kezdeményezéstől a lezárásig, valós időben." },
  { icon: "🔒", title: "Biztonságos hitelesítés", description: "Modern, tokenalapú hitelesítés gondoskodik róla, hogy fiókja és tranzakciói mindig védettek legyenek." },
  { icon: "⭐", title: "Értékelési rendszer", description: "Építse megbízhatóságát valós visszajelzések alapján. Minden sikeres csere után értékelhetik egymást." },
  { icon: "📊", title: "Megbízhatósági elemzés", description: "A rendszer automatikusan számolja megbízhatósági szintjét az aktivitása, értékelései és korábbi tranzakciói alapján." },
  { icon: "🎯", title: "Okos szűrés", description: "Találja meg gyorsan, amit keres, fejlett szűrők segítségével – kategória, hirdetéstípus vagy felhasználói szint szerint." },
];

const FunctionCards = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardCls = isDark
    ? "bg-[rgba(15,15,20,0.9)] border-white/10 hover:border-indigo-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
    : "bg-white border-gray-200 hover:border-indigo-400 hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)]";

  const titleCls = isDark ? "text-white" : "text-gray-900";
  const descCls = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <section id="features" className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`border rounded-xl p-6 text-center hover:-translate-y-1.5 transition-all duration-200 ${cardCls}`}
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-2xl">
              {card.icon}
            </div>
            <h3 className={`text-lg font-bold mb-2 ${titleCls}`}>{card.title}</h3>
            <p className={`text-sm leading-relaxed ${descCls}`}>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FunctionCards;