import { Tag, Zap, ShieldCheck, Star, BarChart2, SlidersHorizontal, type LucideIcon } from "lucide-react";

interface Card {
  icon: LucideIcon;
  iconColor: string;
  accentColor: string;
  title: string;
  description: string;
  span?: string;
  horizontal?: boolean;
}

const cards: Card[] = [
  {
    icon: Tag,
    iconColor: "text-violet-400",
    accentColor: "bg-violet-400",
    title: "Intelligens hirdetések",
    description:
      "Hozzon létre kínálatokat vagy kereséseket részletes leírással és kategóriákkal. Az automatikus párosítás segít gyorsan egymásra találni — szinte azonnal.",
    span: "lg:col-span-2",
  },
  {
    icon: Zap,
    iconColor: "text-amber-400",
    accentColor: "bg-amber-400",
    title: "Azonnali tranzakciók",
    description:
      "Kövesse nyomon az állapotot a kezdeményezéstől a lezárásig, valós időben.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-emerald-400",
    accentColor: "bg-emerald-400",
    title: "Biztonságos hitelesítés",
    description:
      "Modern tokenalapú hitelesítés védi fiókját és minden tranzakcióját.",
  },
  {
    icon: Star,
    iconColor: "text-yellow-400",
    accentColor: "bg-yellow-400",
    title: "Értékelési rendszer",
    description:
      "Minden sikeres csere után értékelhetik egymást — valós visszajelzések alapján.",
  },
  {
    icon: BarChart2,
    iconColor: "text-sky-400",
    accentColor: "bg-sky-400",
    title: "Megbízhatósági elemzés",
    description:
      "A rendszer automatikusan számolja szintjét aktivitása és értékelései alapján.",
  },
  {
    icon: SlidersHorizontal,
    iconColor: "text-indigo-400",
    accentColor: "bg-indigo-400",
    title: "Okos szűrés",
    description:
      "Találja meg gyorsan, amit keres fejlett szűrők segítségével — kategória, hirdetéstípus vagy felhasználói szint szerint. Mindig pontosan a megfelelő ajánlat.",
    span: "lg:col-span-3",
    horizontal: true,
  },
];

const FunctionCards = () => {
  return (
    <section id="features" className="px-4 sm:px-8 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-500 mb-4">
            Funkciók
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Minden, amire szüksége van
          </h2>
          <p className="text-gray-500 max-w-lg text-base">
            A Chronos az egyszerűségre és a biztonságra épül — hogy Ön az üzletre koncentrálhasson.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-2xl border border-gray-200 dark:border-white/6 bg-white dark:bg-white/[0.025] hover:bg-gray-50 dark:hover:bg-white/[0.045] hover:border-gray-300 dark:hover:border-white/12 shadow-sm dark:shadow-none transition-all duration-300 cursor-default ${card.span ?? ""} ${card.horizontal ? "flex items-center gap-8 p-7" : "p-6"}`}
              >
                {/* Subtle gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
                />

                {card.horizontal ? (
                  <>
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 flex items-center justify-center">
                        <Icon size={22} className={card.iconColor} />
                      </div>
                    </div>
                    <div className="relative min-w-0">
                      <div className={`w-6 h-0.5 ${card.accentColor} mb-3 opacity-60`} />
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{card.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 flex items-center justify-center mb-4">
                        <Icon size={18} className={card.iconColor} />
                      </div>
                      <div className={`w-5 h-0.5 ${card.accentColor} mb-3 opacity-60`} />
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FunctionCards;