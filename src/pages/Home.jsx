import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const { listAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const snapshot = await listAllBooks();
        const booksList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksList);
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [listAllBooks]);

  if (loading) return <div>Loading books...</div>;

  return (
    <Container className="mt-4">
      <Row className="g-4">
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow">
              <Card.Img
                variant="top"
                src={book.imageUrl}
                alt={book.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Text>
                  <strong>ISBN:</strong> {book.isbn}
                  <br />
                  <strong>Price:</strong> ₹{book.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
