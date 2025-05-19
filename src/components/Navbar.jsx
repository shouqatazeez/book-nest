import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Navbarr = () => {
  const { isLoggedIn, user, logout } = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          📚 BookNest
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/home" className="mx-2">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/book/list" className="mx-2">
                  Add Listing
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={NavLink} to="/login" className="mx-2">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="mx-2">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link disabled className="mx-2 text-white">
                  Welcome, {user?.email}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="mx-2" role="button">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
