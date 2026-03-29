import { Sprout, BadgeCheck, Trophy, ArrowRight } from "lucide-react";

const levels = [
  {
    icon: Sprout,
    step: 1,
    title: "Kezdő",
    subtitle: "Csatlakozzon a közösséghez",
    description:
      "Első lépések a piactéren. Teljesítsen tranzakciókat, ismerje meg a közösséget, és kezdje el építeni reputációját.",
    criteria: "0 – 4 tranzakció",
    iconGlow: "rgba(52,211,153,0.35)",
    iconBg: "from-emerald-400/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    badgeGlow: "shadow-emerald-500/20",
    criteriaColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20",
    arrowColor: "text-emerald-500/40",
  },
  {
    icon: BadgeCheck,
    step: 2,
    title: "Megbízható",
    subtitle: "Bizonyítottan korrekt",
    description:
      "A közösség már számol Önnel. Jól értékelt, aktív tag, akivel szívesen üzletelnek a többi felhasználók.",
    criteria: "5 – 19 tranzakció",
    iconGlow: "rgba(99,102,241,0.35)",
    iconBg: "from-indigo-400/20 to-blue-500/10",
    iconColor: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    badgeGlow: "shadow-indigo-500/20",
    criteriaColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-400/10 border-indigo-200 dark:border-indigo-400/20",
    arrowColor: "text-indigo-500/40",
  },
  {
    icon: Trophy,
    step: 3,
    title: "Veterán",
    subtitle: "Kiemelt státusz",
    description:
      "A legaktívabb és legmegbízhatóbb tagok legmagasabb fokozata. Példát mutat a teljes közösségnek.",
    criteria: "20+ tranzakció",
    iconGlow: "rgba(251,191,36,0.35)",
    iconBg: "from-amber-400/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    badgeGlow: "shadow-amber-500/20",
    criteriaColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20",
    arrowColor: "text-amber-500/40",
  },
];

const TrustLevelCards = () => {
  return (
    <section id="trustlvls" className="px-4 sm:px-8 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-500 mb-4">
            Bizalmi szintek
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Haladjon felfelé<br className="sm:hidden" /> a ranglistán
            </h2>
            <p className="text-gray-500 max-w-xs text-sm sm:text-right">
              Minél több sikeres tranzakciója van, annál magasabb bizalmi szintre léphet.
            </p>
          </div>
        </div>

        {/* Badge cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {levels.map((level, i) => {
            const Icon = level.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-3xl border ${level.borderColor} bg-white dark:bg-white/[0.025] hover:bg-gray-50 dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none transition-all duration-300 p-7 cursor-default overflow-hidden`}
              >
                {/* Background gradient glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${level.iconGlow} 0%, transparent 70%)` }}
                />

                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6 relative">
                  <span className="text-[10px] font-black tracking-widest text-gray-400 dark:text-gray-700 uppercase">
                    Szint {level.step}
                  </span>
                  {i < levels.length - 1 && (
                    <ArrowRight size={14} className={`absolute -right-9 top-0.5 hidden sm:block ${level.arrowColor}`} />
                  )}
                </div>

                {/* Badge icon */}
                <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle, ${level.iconGlow} 0%, transparent 70%)`, filter: "blur(8px)" }}
                  />
                  <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${level.iconBg} border ${level.borderColor} flex items-center justify-center shadow-xl ${level.badgeGlow} backdrop-blur-sm`}>
                    <Icon size={28} className={level.iconColor} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-600 font-medium mb-1">{level.subtitle}</p>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">{level.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{level.description}</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${level.criteriaColor}`}>
                    {level.criteria}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustLevelCards;