import React from "react";
import { Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../../pages/Home"
import About from "../../pages/About"
import App from "../../App"
// import Logo from '../../media/Logo.png';
import Image from 'react-bootstrap/Image';
import logo from '../../media/cds.jpg'

// import './style.css';
function Navigation(props) {


  // TO DO: potentially use this logic to render component
  // const renderComponent = () => {
  //   console.log("hi")
  // }

  return (
    <Router>
      <Navbar sticky="top" bg="light" expand="lg" style={{ height: '150px' }}>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">
              Home
        </Nav.Link>
            <Nav.Link href="/cds/transfers">Transfers</Nav.Link>
            <Nav.Link href="/cds/about">About</Nav.Link>
            {/* <Nav.Link href="/inventory">Shop</Nav.Link> */}
            <NavDropdown title="Browse" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cds/inventory">Featured Inventory</NavDropdown.Item>
               <NavDropdown.Item href="/lmt"> Lewis Machine & Tool</NavDropdown.Item>
              <NavDropdown.Item href="/aeroprecision">Aero Precision</NavDropdown.Item>
              <NavDropdown.Item href="/#tabber">Browse All</NavDropdown.Item>

              {/* <NavDropdown.Item href="/browse/gun_type">Gun Type</NavDropdown.Item>
          <NavDropdown.Item href="/browse/gun_action">Gun Action</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="/rifles" value="rifles">Rifles</NavDropdown.Item>
          <NavDropdown.Item href="/pistols">Pistols</NavDropdown.Item> */}
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">Specials</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {/* <Form inline>
        <FormControl type="text" placeholder="Search Inventory" className="mr-sm-2" />
        <Button className="search-btn" variant="outline-success">Search</Button>
      </Form> */}

        <a className="title-container" alt="Coleman Defense Solutions" href="/"><div><p id="title-name">Coleman Defense Solutions</p></div></a>


        {/* <p id="title-sub">est 2018</p> */}
        <div className="letter-img">
          <img alt="colemandefense" src={logo}></img>
        </div>

      </Navbar>
    </Router>
  )
}

export default Navigation;