import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const List = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebase.handleCreateNewListing(
        name,
        author,
        isbnNumber,
        price,
        coverPic
      );
      setName("");
      setAuthor("");
      setIsbnNumber("");
      setPrice("");
      setCoverPic("");
    } catch (error) {
      console.error("Error creating book:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h3>Create a New Book Listing</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Author name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover Picture</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </Form>
    </div>
  );
};

export default List;
