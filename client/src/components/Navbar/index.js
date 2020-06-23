import React, { useState, useEffect, useRef, browserHistory, setShow } from "react";
import { Nav, Form, FormControl, Button, NavDropdown, Modal } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../../pages/Home"
import About from "../../pages/About"
import SearchTool from "../../components/searchTool/index"
import App from "../../App"
// import Logo from '../../media/Logo.png';
import Image from 'react-bootstrap/Image';
import logo from '../../media/cds.jpg'

// import './style.css';
function Navigation(props) {

  const refContainer = useRef(1)

  const emailRef = useRef();
  const passwordRef = useRef();

  // const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInState, setLoggedInState] = useState(props);
  const [loggedInUser, setLoggedInUser] = useState('');
  // const signedIn = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {

  let email = emailRef.current.value
  let password = passwordRef.current.value


console.log(email, password)

const userPassword = []

    e.preventDefault();
    console.log("handled it")



    const signIn= () => {
      console.log("posting to DB")
      // POST TO DB
      fetch('/api/signin', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              // first_name: first_name,
              // last_name: last_name,
              email:email,
              password: password,
          })
      }).then(response => {
          console.log("hey i did it")
          console.log(response)
          if (response.status == '200') {
            console.log(email);
            setLoggedInState(true);
            // TODO: Make it users name instead of email
           setLoggedInUser(email);
            setShow(false);
            // alert("success")
          } else if (response.status == '400') {
             alert("incorrect email/password")
          }
      })

  }
signIn();


  }


  const logOut = () =>{
    setLoggedInState(false)
  }

  useEffect(() => {
      setLoggedInState(props);
  }, [props])


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
              <NavDropdown.Item href="/cds/inventory/featured">Featured Inventory</NavDropdown.Item>
              <NavDropdown.Item href="/lmt"> Lewis Machine & Tool</NavDropdown.Item>
              <NavDropdown.Item href="/aeroprecision">Aero Precision</NavDropdown.Item>
              <NavDropdown.Item href="/#tabber">Browse All</NavDropdown.Item>
            </NavDropdown>

          </Nav>
      
      {!loggedInState ? (
  <Button variant="primary" onClick={handleShow}>
  Login/Register
</Button>
      ) : (
        <div>
          {/* <div>hello, {loggedInUser}</div> */}
          <a href="/profile"><Button>View Profile</Button></a>
         <Button onClick={logOut}>LOGOUT</Button>
        </div>
        
      )}
        

          <Modal
            show={show}
            onHide={handleClose}
            // backdrop="static"
            keyboard={false}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Login/Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                Returning Customer? Login Below
         </div>

              <form onSubmit={handleSubmit} encType="multipart/form-data" >

                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" ref={emailRef} placeholder="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="text" ref={passwordRef} placeholder="password" />
                </Form.Group>
              </form>
              <h2>New Customer?</h2>
              <a href="/cds/registration"><Button>Register Here</Button></a>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
              <Button variant="primary" onClick={handleSubmit}>Login</Button>
            </Modal.Footer>
          </Modal>

          <SearchTool searchText="Search by Item #"></SearchTool>
        </Navbar.Collapse>
        <p className="gov-id mt2">DUNS: 08-654-7079 | CAGE: 8M1W7</p>
      </Navbar>
    </Router>

  )
}

export default Navigation;