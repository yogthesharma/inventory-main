import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

// adding styling
import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <Navbar className="mainNav" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Inventor</Navbar.Brand>
        <Nav className="ml-auto">
          <Link to="/">
            <Nav.Link href="#home">Home</Nav.Link>
          </Link>
          <Link to="/documentation">
            <Nav.Link href="#home">Documentation</Nav.Link>
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
