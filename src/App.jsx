//Styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//React Router
import { Routes, Route } from "react-router-dom";

//Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

// Components
import Navbarr from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
