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
function Navigation (props) {


  // TO DO: potentially use this logic to render component
// const renderComponent = () => {
//   console.log("hi")
// }

    return (
<Router>
  <Navbar sticky="top" bg="light" expand="lg" style={{height: '150px'}}>
   
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">
        Home
        </Nav.Link>
        <Nav.Link href="/cds/transfers">Transfers</Nav.Link>
        {/* <Nav.Link href="/inventory">Shop</Nav.Link> */}
        <NavDropdown title="Browse" id="basic-nav-dropdown">
          <NavDropdown.Item href="/cds/inventory">Current Inventory</NavDropdown.Item>
          <NavDropdown.Item
          href="/browse/manufacturer"
          //  onClick={renderComponent}
           > Manufacturer</NavDropdown.Item>
          {/* <NavDropdown.Item href="/browse/gun_type">Gun Type</NavDropdown.Item>
          <NavDropdown.Item href="/browse/gun_action">Gun Action</NavDropdown.Item> */}
          {/* <NavDropdown.Item href="/rifles" value="rifles">Rifles</NavDropdown.Item>
          <NavDropdown.Item href="/pistols">Pistols</NavDropdown.Item> */}
          {/* <NavDropdown.Divider /> */}
          {/* <NavDropdown.Item href="#action/3.4">Specials</NavDropdown.Item> */}
        </NavDropdown>
        </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search Inventory" className="mr-sm-2" />
        <Button className="search-btn" variant="outline-success">Search</Button>
      </Form> */}
    </Navbar.Collapse>
      <a className="title-container"  alt="Coleman Defense Solutions" href="/"><div><p id="title-name">Coleman Defense Solutions</p></div></a>
       

    <p id="title-sub">est 2018</p>
        <div className="letter-img">
           <img alt="colemandefense" src={logo}></img>
          </div>
     
  </Navbar>
</Router>
    )
}

export default Navigation;


// import React from "react";
// import { Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
// import './style.css'
// import letter from "../../../../content/assets/cds.jpg"
// // import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Image from 'react-bootstrap/Image';


// // import './style.css';
// function Navigation (props) {
//     return (
// <div>
//   <Navbar sticky="top" bg="light" expand="lg" style={{height: '150px'}}>
//     <Navbar.Brand href="/" alt="Coleman Defense Solutions">
//     {/* <Image src='https://firebasestorage.googleapis.com/v0/b/coleman-defense-solutions.appspot.com/o/69879143_2931071616907240_2275242282057728000_n.png?alt=media&token=a078a87e-2ec3-433e-9db7-f2b14d898edd' fluid></Image> */}
    
//      <span><Image className="logo-img" src={letter}></Image></span>
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="mr-auto">
//         <Nav.Link href="/">
//         Home
//         </Nav.Link>
//         <Nav.Link href="/about">Transfer Services</Nav.Link>
  
//       </Nav>
//     </Navbar.Collapse>
//   </Navbar>
// </div>
//     )
// }

// export default Navigation;


/* <Image src='https://firebasestorage.googleapis.com/v0/b/coleman-defense-solutions.appspot.com/o/69879143_2931071616907240_2275242282057728000_n.png?alt=media&token=a078a87e-2ec3-433e-9db7-f2b14d898edd' fluid></Image> */