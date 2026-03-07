const cards = [
  { icon: "📦", title: "Intelligens hirdetések", description: "Hozz létre kínálatokat vagy kereséseket részletes leírással és kategóriákkal. Az automatikus párosítás segít gyorsan egymásra találni." },
  { icon: "⚡", title: "Azonnali tranzakciók", description: "Bonyolítsd le a cseréket gyorsan és egyszerűen. Kövesd nyomon az állapotot a kezdeményezéstől a lezárásig, valós időben." },
  { icon: "🔒", title: "Biztonságos hitelesítés", description: "Modern, tokenalapú hitelesítés gondoskodik róla, hogy a fiókod és a tranzakcióid mindig védettek legyenek." },
  { icon: "⭐", title: "Értékelési rendszer", description: "Építsd a megbízhatóságodat valós visszajelzések alapján. Minden sikeres csere után értékelhetitek egymást." },
  { icon: "📊", title: "Megbízhatósági elemzés", description: "A rendszer automatikusan számolja a megbízhatósági szintedet az aktivitásod, értékeléseid és korábbi tranzakcióid alapján." },
  { icon: "🎯", title: "Okos szűrés", description: "Találd meg gyorsan, amit keresel fejlett szűrők segítségével – kategória, hirdetéstípus vagy felhasználói szint szerint." },
];

const FunctionCards = () => (
  <section id="features" className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[rgba(15,15,20,0.9)] border border-white/10 rounded-xl p-6 text-center hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-200"
        >
          <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-2xl">
            {card.icon}
          </div>
          <h3 className="text-lg font-bold mb-2 text-white">{card.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FunctionCards;