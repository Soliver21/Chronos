import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/auth/LoginForm"; // Importáld be a login formot

const App = () => {
  return (
    <BrowserRouter>
      <div className="landing-page">
        <div className="gradient-bg"></div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;