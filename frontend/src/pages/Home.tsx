import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import FunctionCards from "../components/home/FunctionCards";
import Introduction from "../components/home/Introduction";
import Navbar from "../components/home/Navbar";
import TrustLevelCards from "../components/home/TrustLevelCards";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%)," +
            "radial-gradient(circle at 80% 80%, rgba(99,102,241,0.15) 0%, transparent 50%)," +
            "radial-gradient(circle at 40% 20%, rgba(168,85,247,0.1) 0%, transparent 50%)",
        }}
      />
      <Navbar />
      <Introduction />
      <FunctionCards />
      <TrustLevelCards />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;