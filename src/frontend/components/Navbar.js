import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { TransactionContext } from "../context/TransactionContext";
import './Navbar.css';
import logo from "../../images/Logo.png";


const Navigation = ({ web3Handler, account }) => {
  const { IsAdmin } = React.useContext(TransactionContext);

  return (
    <Navbar className="navbar" expand="lg" variant="dark">
      <Container>
          <img src={logo} className="logo" alt="logo" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
             <Nav.Link as={Link} to="/"  className="navItems">
              Home
            </Nav.Link>
            {IsAdmin && (
              <Nav.Link as={Link} to="/create" className="navItems">
                Create
              </Nav.Link>
            )}
            {!IsAdmin && (
              <Nav.Link as={Link} to="/new-Warrenties" className="navItems">
                New Warranties
              </Nav.Link>
            )}
            {IsAdmin && (
              <Nav.Link as={Link} to="/my-listed-items" className="navItems">
                Issued Warranties
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/my-purchases" className="navItems">
              {!IsAdmin &&"Claimed Warranties"}
            </Nav.Link>
            <Nav.Link as={Link} to="/claimed" className="navItems">
              {IsAdmin &&"Claimed Warranties"}
            </Nav.Link>
            {!IsAdmin ? (
              <Nav.Link as={Link} to="/login" className="navItems">
                Admin Login
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/logout" className="navItems">
                Logout
              </Nav.Link>
            )}
            
          </Nav>
          <Nav>
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <Button variant="outline-light">
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={web3Handler} variant="outline-light">
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
