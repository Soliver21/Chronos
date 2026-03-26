import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import FunctionCards from "../components/home/FunctionCards";
import Introduction from "../components/home/Introduction";
import Navbar from "../components/home/Navbar";
import TrustLevelCards from "../components/home/TrustLevelCards";
import WebsiteReviewSection from "../components/home/WebsiteReviewSection";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}>
      {/* Sötét téma lemaradt, itt implementáltam - Olivér */}
      {isDark && (
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%)," +
              "radial-gradient(circle at 80% 80%, rgba(99,102,241,0.15) 0%, transparent 50%)," +
              "radial-gradient(circle at 40% 20%, rgba(168,85,247,0.1) 0%, transparent 50%)",
          }}
        />
      )}
      <Navbar />
      <Introduction />
      <FunctionCards />
      <TrustLevelCards />
      <Cta />
      <WebsiteReviewSection />
      <Footer />
    </div>
  );
};

export default Home;