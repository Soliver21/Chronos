import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/auth/LoginForm"; 
import RegisterForm from "./components/auth/RegisterForm"

const App = () => {
  return (
    <BrowserRouter>
      <div className="landing-page">
        <div className="gradient-bg"></div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;