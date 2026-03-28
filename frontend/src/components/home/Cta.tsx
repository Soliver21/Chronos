import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Cta = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sectionCls = isDark
    ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
    : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200";

  const titleCls = isDark ? "text-white" : "text-gray-900";
  const subCls = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <section
      id="about"
      className={`px-4 sm:px-8 py-16 my-16 max-w-3xl mx-auto text-center border rounded-3xl ${sectionCls}`}
    >
      <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${titleCls}`}>
        Készen áll a kereskedésre?
      </h2>
      <p className={`text-base sm:text-lg mb-8 max-w-lg mx-auto ${subCls}`}>
        Csatlakozzon felhasználók ezreihez, akik már most is cserélnek és építik a bizalmat a közösségben.
      </p>
      <Link
        to="/register"
        className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:-translate-y-1 transition-all"
      >
        Hozza létre profilját
      </Link>
    </section>
  );
};

export default Cta;