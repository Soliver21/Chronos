import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
        isDark
          ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20"
          : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
      }`}
      title={isDark ? "Váltás világos módra" : "Váltás sötét módra"}
    >
      <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${isDark ? "bg-indigo-600" : "bg-amber-400"}`}>
        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-300 ${isDark ? "left-0.5" : "left-4"}`} />
      </div>
      {isDark
        ? <><Moon size={13} /> Sötét</>
        : <><Sun size={13} /> Világos</>
      }
    </button>
  );
}