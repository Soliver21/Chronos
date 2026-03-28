import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Introduction = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const headingCls = isDark
    ? "bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
    : "bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent";

  const subCls = isDark ? "text-gray-400" : "text-gray-500";

  const secondaryBtn = isDark
    ? "border border-white/10 text-gray-300 hover:bg-white/5"
    : "border border-gray-300 text-gray-600 hover:bg-gray-100";

  return (
    <section className="px-4 sm:px-8 pt-20 pb-16 text-center max-w-4xl mx-auto">
      <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-[fadeInUp_0.8s_ease_0.2s_both] ${headingCls}`}>
        Cseréljen bizalommal,
        <br />
        kereskedjen könnyedén
      </h1>
      <p className={`text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease_0.4s_both] ${subCls}`}>
        Egy közösségi piactér, amely az átláthatóságra és a bizalomra épül.
        Töltsön fel hirdetéseket, fedezze fel az ajánlatokat, kössön üzleteket,
        és építse a megbízhatóságát.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center animate-[fadeInUp_0.8s_ease_0.6s_both]">
        <Link
          to="/register"
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:-translate-y-1 transition-all"
        >
          Kezdjen el kereskedni
        </Link>
        <Link
          to="/listings"
          className={`px-7 py-3 rounded-xl font-semibold text-base transition-all hover:-translate-y-1 ${secondaryBtn}`}
        >
          Piactér megtekintése
        </Link>
      </div>
    </section>
  );
};

export default Introduction;