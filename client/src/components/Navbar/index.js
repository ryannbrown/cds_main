import React, {
  Component,
  useState,
  useEffect,
  useRef,
  browserHistory,
  setShow,
  setState,
  updatedValues,
} from "react";
import {
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Modal,
  Alert,
} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./style.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import SearchTool from "../../components/searchTool/index";
import App from "../../App";
// import Logo from '../../media/Logo.png';
import Image from "react-bootstrap/Image";
import logo from "../../media/cds.jpg";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";

// import './style.css';
class Navigation extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      loggedIn: props.loggedIn,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.fileChanged = this.fileChanged.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  handleClose = () => {
    // console.log("clicked")
    this.setState({
      show: false,
      setShow: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
      setShow: true,
    });
  };

  handleSubmit = (e) => {
    const ourContext = this.context;

    let email = this.emailRef.current.value;
    let password = this.passwordRef.current.value;

    // console.log(email, password)

    const userPassword = [];

    e.preventDefault();
    // console.log("handled it")

    const signIn = () => {
      // console.log("posting to DB")
      // POST TO DB
      fetch("/api/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // first_name: first_name,
          // last_name: last_name,
          email: email,
          password: password,
        }),
      }).then((response) => {
        // console.log("hey i did it")
        // console.log(response)
        if (response.status == "200") {
          // console.log(email);
          this.setState({
            loggedIn: true,
            user: email,
            show: false,
            showLoginAlert: false,
          });
          // sessionStorage.setItem("name", postData.name);
          // sessionStorage.setItem("email", email);
          // sessionStorage.setItem("loggedIn", true);

           ourContext.activateUser(email)

          this.props.action(email);
          // alert("success")
        } else if (response.status == "400") {
          this.setState({
            showLoginAlert: true,
          });
        }
      });
    };
    signIn();
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("email");
    window.location.reload();
  };

  componentDidMount() {
    this.setState({
      loggedIn: sessionStorage.getItem("loggedIn"),
      user: sessionStorage.getItem("email"),
    });
  }
  componentDidUpdate() {
    // console.log("updated nav state:", this.state)
  }

  // useEffect(() => {
  //     setLoggedInState(props);
  //     setUser(props.user);

  //     // setUser(props);
  // }, [props])

  render() {
    const { show } = this.state;

    return (
        <Navbar sticky="top" bg="dark" expand="lg">
          <Navbar.Brand as={Link} className="mr4" style={{ color: "white" }} to="/">
            <img
              src={logo}
              width="115"
              height="115"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            {/* Coleman Defense Solutions */}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cds/transfers">Transfers</Nav.Link>
              <Nav.Link as={Link} to="/cds/about">About</Nav.Link>
              {/* <Nav.Link to="/inventory">Shop</Nav.Link> */}
              <NavDropdown title="Browse" id="basic-nav-dropdown">
                <NavDropdown.Item  as={Link} to="/cds/inventory/featured">
                  Current Inventory
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lmt">
                  {" "}
                  Lewis Machine & Tool
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/aeroprecision">
                  Aero Precision
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="/#tabber">Browse All</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>

            {!this.state.loggedIn ? (
              <Button
                className="btn-initial-signin"
                variant="primary"
                onClick={this.handleShow}
              >
                Login/Register
              </Button>
            ) : (
              <div className="nav-login-container">
                <p className="nav-login-greeting">hello, {this.state.user}</p>
                <Link to="/profile">
                  <Button className="prof-btn">View Profile</Button>
                </Link>
                <Button onClick={this.logOut}>LOGOUT</Button>
              </div>
            )}

            <Modal
              show={show}
              onHide={this.handleClose}
              // backdrop="static"
              keyboard={false}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Login/Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>Returning Customer? Login Below</div>

                <form
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data"
                >
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      ref={this.emailRef}
                      placeholder="email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      ref={this.passwordRef}
                      placeholder="password"
                    />
                  </Form.Group>
                </form>
                {this.state.showLoginAlert &&
                <Alert
                  variant="danger"
                  onClose={() => this.setState({showLoginAlert: false})}
                  dismissible
                >
                  <Alert.Heading>We are having trouble finding you.</Alert.Heading>
                  <p>
                    Try a different password, otherwise ensure your login is correct.
                  </p>
                </Alert>
                }
                <h2>New Customer?</h2>
                <a href="/cds/registration">
                  <Button>Register Here</Button>
                </a>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>

            {/* <SearchTool searchText="Search by Item #"></SearchTool> */}
          </Navbar.Collapse>
          <p className="gov-id">DUNS: 08-654-7079 | CAGE: 8M1W7</p>
        </Navbar>
    );
  }
}

export default Navigation;
