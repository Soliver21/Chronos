import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import FunctionCards from "../components/home/FunctionCards";
import Introduction from "../components/home/Introduction";
import Navbar from "../components/home/Navbar";
import TrustLevelCards from "../components/home/TrustLevelCards";
import WebsiteReviewSection from "../components/home/WebsiteReviewSection";
import Dashbar from "../components/dashboard/Dashbar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: isDark
          ? `
              radial-gradient(ellipse 70% 35% at 15% 25%, rgba(109,40,217,0.14) 0%, transparent 55%),
              radial-gradient(ellipse 60% 30% at 85% 55%, rgba(79,70,229,0.11) 0%, transparent 55%),
              radial-gradient(ellipse 50% 25% at 50% 80%, rgba(139,92,246,0.1) 0%, transparent 55%),
              radial-gradient(ellipse 40% 20% at 10% 75%, rgba(67,56,202,0.1) 0%, transparent 55%),
              #060614
            `
          : `
              radial-gradient(ellipse 70% 35% at 15% 25%, rgba(139,92,246,0.06) 0%, transparent 55%),
              radial-gradient(ellipse 60% 30% at 85% 55%, rgba(99,102,241,0.05) 0%, transparent 55%),
              #f8f8ff
            `,
      }}
    >
      {user ? <Dashbar /> : <Navbar />}

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