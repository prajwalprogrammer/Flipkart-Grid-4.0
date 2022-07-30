import React, { useContext,useEffect } from "react";
import logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { TransactionContext } from "../context/TransactionContext";
const Navbar = () => {
  const { IsAdmin, HandleLogout } = useContext(TransactionContext);
  useEffect(() => {
    
  }, [IsAdmin])
  
  return (
    <nav>
      <div className="nav">
        <img className="logo" src={logo} alt="KryptoCart"></img>
        <Nav className="unOrdered">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {IsAdmin && (
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
          )}
          {IsAdmin && (
            <Nav.Link as={Link} to="/my-listed-items">
              My Listed Items
            </Nav.Link>
          )}
          {IsAdmin && (
            <Nav.Link as={Link} to="/my-Sold-items">
              My Sold Items
            </Nav.Link>
          )}

          <Nav.Link as={Link} to="/my-purchases">
            My Purchases
          </Nav.Link>
          {!IsAdmin ? (
            <Nav.Link as={Link} to="/login">
              Admin Login
            </Nav.Link>
          ) : (
            <Nav.Link onClick={()=>HandleLogout()}>
              {/* <Button >Logout</Button> */}
              Logout
            </Nav.Link>
          )}
        </Nav>
        {/* <li>Our Services</li>
          <li>My Products</li> */}
        {/* <li>
            <a href="/login">Admin Login</a>
          </li> */}
      </div>
    </nav>
  );
};

export default Navbar;
