import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <section className="px-4 sm:px-8 pt-20 pb-16 text-center max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent animate-[fadeInUp_0.8s_ease_0.2s_both]">
        Cserélj bizalommal,
        <br />
        kereskedj könnyedén
      </h1>
      <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease_0.4s_both]">
        Egy közösségi piactér, amely az átláthatóságra és a bizalomra épül.
        Tölts fel hirdetéseket, fedezd fel az ajánlatokat, köss üzleteket, és építsd a megbízhatóságodat.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center animate-[fadeInUp_0.8s_ease_0.6s_both]">
        <Link
          to="/register"
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:-translate-y-1 transition-all"
        >
          Kezdj el kereskedni
        </Link>
        <Link
          to="/listings"
          className="px-7 py-3 rounded-xl border border-white/10 text-gray-300 font-semibold text-base hover:bg-white/5 transition-colors"
        >
          Piactér megtekintése
        </Link>
      </div>
    </section>
  );
};

export default Introduction;