import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";

import "../App.css";
import PokedexLogo from "../assets/img/Pokedex_logo.png";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };
  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={PokedexLogo} alt="Pokedex Logo" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#mypokemon"
              className={
                activeLink === "mypokemon"
                  ? "active navbar-link"
                  : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("mypokemon")}
            >
              My Pokemon
            </Nav.Link>
          </Nav>

          <InputGroup id="navSearch" className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pokemon Search"
              aria-label="search"
              aria-describedby="basic-addon2"
              className=""
            />
            <Button variant="outline-warning" id="button-addon2">
              Search
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
