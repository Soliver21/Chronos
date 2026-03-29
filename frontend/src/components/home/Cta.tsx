import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section id="about" className="px-4 sm:px-8 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Full-width panel */}
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] px-8 sm:px-16 py-20">

          {/* Violet aurora glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(109,40,217,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Dot grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Decorative ring */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-violet-500/10 pointer-events-none"
          />
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-violet-500/8 pointer-events-none"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-left">

            {/* Left: text */}
            <div className="max-w-xl">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-500 mb-4">
                Csatlakozzon most
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Készen áll<br />a kereskedésre?
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Csatlakozzon felhasználók ezreihez, akik már most is cserélnek
                és építik megbízhatóságukat a közösségben.
              </p>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-center lg:items-end gap-3 flex-shrink-0">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-bold text-base shadow-xl shadow-black/30 hover:-translate-y-0.5 hover:shadow-black/40 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Hozza létre profilját
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/listings"
                className="text-sm text-gray-600 hover:text-gray-300 transition-colors cursor-pointer"
              >
                Vagy böngésszen hirdetések között →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;