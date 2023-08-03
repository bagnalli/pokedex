import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
import "../App.css";

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-danger">
      <Container>
        <Navbar.Brand href="#home">Pokedex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#mypokemon">My Pokemon</Nav.Link>
          </Nav>

          <InputGroup id="navSearch" className="d-flex">
            <Form.Control
              type="search"
              placeholder="search"
              aria-label="search"
              aria-describedby="basic-addon2"
              className=""
            />
            <Button variant="outline-secondary" id="button-addon2">
              Button
            </Button>
          </InputGroup>

          <Button variant="outline-light" className="ms-2">
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
