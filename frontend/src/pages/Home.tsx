import Cta from "../components/home/Cta";
import Footer from "../components/home/Footer";
import FunctionCards from "../components/home/FunctionCards";
import Introduction from "../components/home/Introduction";
import Navbar from "../components/home/Navbar";
import TrustLevelCards from "../components/home/TrustLevelCards";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Introduction/>
      <FunctionCards/>
      <TrustLevelCards/>
      <Cta/>
      <Footer/>
    </div>
  )
}

export default Home
