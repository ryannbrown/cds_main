import React, {useState, browserHistory} from "react";
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

  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(name)
    window.location.href =`/inventory/model/${name}`;
}
  


  // TO DO: potentially use this logic to render component
  // const renderComponent = () => {
  //   console.log("hi")
  // }

  return (
    <Router>

      <Navbar sticky="top" bg="dark" expand="lg">
        <Navbar.Brand 
        className='mr4' style={{ color: 'white' }} href="/">
           <img
        src={logo}
        width="125"
        height="125"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      {/* Coleman Defense Solutions */}
      </Navbar.Brand>
     
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
      {/* <Navbar.Brand className="brand-text" style={{color: 'white'}}>Coleman Defense Solutions</Navbar.Brand> */}
  </Nav>
  {/* <Form onSubmit={handleSubmit} inline>
       <FormControl type="text"  value={name} onChange={e => setName(e.target.value)}   placeholder="Search Inventory" className="mr-sm-2" />
       <Button onSubmit={handleSubmit} type="submit" className="search-btn" variant="outline-success">Search</Button>
       </Form> */}
      </Navbar.Collapse>
      
      </Navbar>
    </Router>

    // <Navbar sticky="top" bg="light" expand="lg" style={{ height: '150px' }}>
    //   <a className="title-container" alt="Coleman Defense Solutions" href="/"><div><p id="title-name">Coleman Defense Solutions</p></div></a>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <Nav.Link href="/">
    //         Home
    //   </Nav.Link>
    //       <Nav.Link href="/cds/transfers">Transfers</Nav.Link>
    //       <Nav.Link href="/cds/about">About</Nav.Link>
    //       {/* <Nav.Link href="/inventory">Shop</Nav.Link> */}
    //       <NavDropdown title="Browse" id="basic-nav-dropdown">
    //         <NavDropdown.Item href="/cds/inventory">Featured Inventory</NavDropdown.Item>
    //         <NavDropdown.Item href="/lmt"> Lewis Machine & Tool</NavDropdown.Item>
    //         <NavDropdown.Item href="/aeroprecision">Aero Precision</NavDropdown.Item>
    //         <NavDropdown.Item href="/#tabber">Browse All</NavDropdown.Item>

    //         {/* <NavDropdown.Item href="/browse/gun_type">Gun Type</NavDropdown.Item>
    //     <NavDropdown.Item href="/browse/gun_action">Gun Action</NavDropdown.Item> */}
    //         {/* <NavDropdown.Item href="/rifles" value="rifles">Rifles</NavDropdown.Item>
    //     <NavDropdown.Item href="/pistols">Pistols</NavDropdown.Item> */}
    //         {/* <NavDropdown.Divider /> */}
    //         {/* <NavDropdown.Item href="#action/3.4">Specials</NavDropdown.Item> */}
    //       </NavDropdown>
    //     </Nav>
    //   </Navbar.Collapse>
    //   <Form inline>
    //     <FormControl type="text" placeholder="Search Inventory" className="mr-sm-2" />
    //     <Button className="search-btn" variant="outline-success">Search</Button>
    //   </Form>




    //   {/* <p id="title-sub">est 2018</p> */}


    // </Navbar>

  )
}

export default Navigation;