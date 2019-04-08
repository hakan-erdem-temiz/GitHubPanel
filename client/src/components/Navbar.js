import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = ({ user }) => {
  //props.user
  return (
    <Navbar bg="dark" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className={"nav-item nav-link"} to="/home">
            Home <span className="sr-only">(current)</span>
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className={"nav-item nav-link"} to="/login">
                Login
              </NavLink>
              <NavLink className={"nav-item nav-link"} to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className={"nav-item nav-link"} to="/profile">
                Profile <span className="sr-only">(current)</span>
              </NavLink>
              <NavLink className={"nav-item nav-link"} to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
