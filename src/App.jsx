//Styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//React Router
import { Routes, Route } from "react-router-dom";

//Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import List from "./pages/List";

// Components
import Navbarr from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
