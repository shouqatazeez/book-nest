import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import List from "./pages/List";
import Home from "./pages/Home";
import About from "./pages/About";

import Navbarr from "./components/Navbar";
import { useFirebase } from "./context/Firebase";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const { isLoggedIn } = useFirebase();

  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/list"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <List />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
