import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Body>
          <h1 className="text-center mb-4">📘 Welcome to BookNest</h1>
          <p className="text-center">
            Bookify helps users explore, list, and manage books easily. Whether
            you want to browse books or share your own, we’ve got you covered!
          </p>

          <Row className="mt-4 text-center">
            <Col md={6} className="mb-3">
              <h5>🔐 Already a user?</h5>
              <Link to="/login">
                <Button variant="primary" size="lg">
                  Login
                </Button>
              </Link>
            </Col>
            <Col md={6} className="mb-3">
              <h5>🆕 New here?</h5>
              <Link to="/register">
                <Button variant="success" size="lg">
                  Register
                </Button>
              </Link>
            </Col>
          </Row>

          <hr className="my-4" />

          <h4 className="text-center mb-3">📚 What can you do?</h4>
          <ul>
            <li>Explore books listed by others</li>
            <li>Add your own books with images</li>
            <li>Stay organized with your listings</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
