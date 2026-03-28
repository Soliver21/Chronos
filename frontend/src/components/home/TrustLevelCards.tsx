import { useTheme } from "../../context/ThemeContext";

const trustLevels = [
  { emoji: "🌱", title: "Kezdő", description: "Itt indul mindenki. Teljesítsen sikeres tranzakciókat, ismerje meg a közösséget, és építse fel az első értékeléseit.", gradient: "from-emerald-500 to-green-600" },
  { emoji: "✨", title: "Megbízható", description: "Bizonyítottan korrekt felhasználó. A közösség már számol Önnel, és szívesen üzletel Önnel.", gradient: "from-blue-500 to-blue-700" },
  { emoji: "🏆", title: "Veterán", description: "Kiemelt státusz a legaktívabb és legmegbízhatóbb tagok számára. Példát mutat a közösségnek.", gradient: "from-orange-400 to-orange-600" },
];

const TrustLevelCards = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const titleCls = isDark ? "text-white" : "text-gray-900";
  const subCls = isDark ? "text-gray-400" : "text-gray-500";
  const cardCls = isDark
    ? "bg-white/[0.02] border-white/8 hover:border-indigo-500/30"
    : "bg-white border-gray-200 hover:border-indigo-400 shadow-sm hover:shadow-md";
  const cardTitleCls = isDark ? "text-white" : "text-gray-900";
  const cardDescCls = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <section id="trustlvls" className="px-4 sm:px-8 py-16 max-w-5xl mx-auto text-center">
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${titleCls}`}>
        Bizalmi szintek
      </h2>
      <p className={`text-base mb-12 max-w-xl mx-auto ${subCls}`}>
        A Chronos közösségében a megbízhatóság folyamatosan növekszik a tevékenység alapján.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {trustLevels.map((level, index) => (
          <div
            key={index}
            className={`border rounded-2xl p-8 hover:-translate-y-1.5 transition-all duration-300 ${cardCls}`}
          >
            <div className={`w-16 h-16 rounded-full mx-auto mb-5 bg-gradient-to-br ${level.gradient} flex items-center justify-center text-3xl shadow-lg`}>
              {level.emoji}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${cardTitleCls}`}>{level.title}</h3>
            <p className={`text-sm leading-relaxed ${cardDescCls}`}>{level.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustLevelCards;