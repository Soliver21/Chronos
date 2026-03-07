const trustLevels = [
  { emoji: "🌱", title: "Kezdő", description: "Itt indul mindenki. Teljesíts sikeres tranzakciókat, ismerd meg a közösséget, és építsd fel az első értékeléseidet.", gradient: "from-emerald-500 to-green-600" },
  { emoji: "✨", title: "Megbízható", description: "Bizonyítottan korrekt felhasználó. A közösség már számol veled, és szívesen üzletel veled.", gradient: "from-blue-500 to-blue-700" },
  { emoji: "🏆", title: "Veterán", description: "Kiemelt státusz a legaktívabb és legmegbízhatóbb tagok számára. Példát mutatsz a közösségnek.", gradient: "from-orange-400 to-orange-600" },
];

const TrustLevelCards = () => (
  <section id="trustlvls" className="px-4 sm:px-8 py-16 max-w-5xl mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">Bizalmi szintek</h2>
    <p className="text-gray-400 text-base mb-12 max-w-xl mx-auto">
      A Chronos közösségében a megbízhatóságod folyamatosan növekszik a tevékenységed alapján.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {trustLevels.map((level, index) => (
        <div
          key={index}
          className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 hover:-translate-y-1.5 hover:border-indigo-500/30 transition-all duration-300"
        >
          <div className={`w-16 h-16 rounded-full mx-auto mb-5 bg-gradient-to-br ${level.gradient} flex items-center justify-center text-3xl shadow-lg`}>
            {level.emoji}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{level.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TrustLevelCards;