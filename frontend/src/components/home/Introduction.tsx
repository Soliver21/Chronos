import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Star } from "lucide-react";
import { api } from "../../services/api";

interface PublicStats {
  totalUsers: number;
  completedTransactions: number;
  averageRating: number | null;
  totalReviews: number;
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k+`;
  return `${n}+`;
}

const Introduction = () => {
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    api.get<PublicStats>("/stats").then((res) => setStats(res.data)).catch(() => {});
  }, []);

  const statItems = [
    { icon: Users, value: stats ? formatNumber(stats.totalUsers) : "…", label: "Aktív felhasználó" },
    { icon: TrendingUp, value: stats ? formatNumber(stats.completedTransactions) : "…", label: "Sikeres tranzakció" },
    { icon: Star, value: stats?.averageRating ? `${stats.averageRating} / 5` : "…", label: "Átlagos értékelés" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">

      {/* Animated aurora orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[18%] left-[12%] w-[650px] h-[650px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.38) 0%, transparent 65%)", filter: "blur(55px)", animation: "float-orb 14s ease-in-out infinite" }} />
        <div className="absolute bottom-[12%] right-[8%] w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.32) 0%, transparent 65%)", filter: "blur(55px)", animation: "float-orb-2 17s ease-in-out infinite" }} />
        <div className="absolute top-[48%] right-[28%] w-[360px] h-[360px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 65%)", filter: "blur(45px)", animation: "float-orb-3 20s ease-in-out infinite" }} />
        <div className="absolute bottom-[28%] left-[32%] w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)", filter: "blur(45px)", animation: "float-orb 22s ease-in-out infinite reverse" }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none dark:opacity-100 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.25) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)" }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-20 pb-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-semibold tracking-widest uppercase mb-8 animate-[fadeInUp_0.6s_ease_0.1s_both]">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
          Megbízható közösségi piactér
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 text-gray-900 dark:text-white animate-[fadeInUp_0.8s_ease_0.2s_both]">
          Cseréljen{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent pb-1 inline-block">
            bizalommal
          </span>
          ,<br />
          kereskedjen könnyedén.
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease_0.4s_both]">
          Egy közösségi piactér, amely az átláthatóságra és a bizalomra épül.
          Töltsön fel hirdetéseket, fedezze fel az ajánlatokat, kössön üzleteket,
          és építse a megbízhatóságát.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16 animate-[fadeInUp_0.8s_ease_0.6s_both]">
          <Link to="/register"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-base shadow-xl shadow-emerald-500/30 hover:-translate-y-0.5 hover:shadow-emerald-500/50 transition-all duration-200 cursor-pointer">
            Kezdjen el kereskedni
            <ArrowRight size={16} />
          </Link>
          <Link to="/listings"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white font-semibold text-base hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/25 transition-all duration-200 cursor-pointer backdrop-blur-sm">
            Piactér megtekintése
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-[fadeInUp_0.8s_ease_0.8s_both]">
          {statItems.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/8 backdrop-blur-sm shadow-sm dark:shadow-none">
              <Icon size={18} className="text-violet-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-base font-bold text-gray-900 dark:text-white leading-none">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;