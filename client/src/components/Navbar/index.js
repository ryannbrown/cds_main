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
import moLogo from "../../media/icon.png"
import LoginModal from "../loginModal/index"
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
var _ = require("lodash");

// import './style.css';
class Navigation extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      userLoggedIn: props.userLoggedIn,
      isMobile: ''
    };

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

  logOut = () => {
    this.setState({
      userLoggedIn: false,
    });
    sessionStorage.removeItem("userLoggedIn");
    sessionStorage.removeItem("email");
    window.location.reload();
  };

  componentDidMount() {
    this.setState({
      userLoggedIn: sessionStorage.getItem("userLoggedIn"),
      user: sessionStorage.getItem("email"),
    });

      if (window.innerWidth < 991) {
        this.setState({
          isMobile: true,
        });
      } else if (window.innerWidth < 991) {
        this.setState({
          isMobile: false,
        });
      }
  }
  componentDidUpdate() {
    window.addEventListener(
      "resize",
      _.debounce(() => {
        if (window.innerWidth > 991) {
          console.log("isn't mobile")
          this.setState({
            isMobile: false,
          });
        } if (window.innerWidth < 991) {
          console.log('is mobile')
          this.setState({
            isMobile: true,
          });
        }
      }, 400)
    );
    // console.log("updated nav state:", this.state)
  }


  render() {
    const { show, isMobile } = this.state;

    return (
      <ThemeContextConsumer>
      {(context) => (
        <Navbar collapseOnSelect sticky="top" bg="dark" expand="lg">
          <Navbar.Brand eventKey="1" as={Link} className="mr4" style={{ color: "white" }} to="/">
            {isMobile?  
            //  <img
            //   src={moLogo}
            //   width="115"
            //   height="auto"
            //   className="d-inline-block align-top"
            //   alt="CDS Logo"
            // />
            <h1>Coleman Defense</h1>
             :   <img
            src={logo}
            width="115"
            height="115"
            className="d-inline-block align-top"
            alt="CDS Logo"
          />  }
          
            {/* Coleman Defense Solutions */}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
              <Nav.Link eventKey="2"  as={Link} to="/">Home</Nav.Link>
              <Nav.Link eventKey="3" as={Link} to="/cds/transfers">Transfers</Nav.Link>
              <Nav.Link eventKey="4" as={Link} to="/cds/about">About</Nav.Link>
              {/* <Nav.Link to="/inventory">Shop</Nav.Link> */}
              <NavDropdown title="Browse" id="basic-nav-dropdown">
                <NavDropdown.Item eventKey="5"  as={Link} to="/cds/inventory/current">
                  Current Inventory
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="6" as={Link} to="/lmt">
                  {" "}
                  Lewis Machine & Tool
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="7" as={Link} to="/aeroprecision">
                  Aero Precision
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="/#tabber">Browse All</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>

            {!context.userLoggedIn ? (
              <Button
                className="btn-initial-signin"
                variant="primary"
                onClick={this.handleShow}
              >
                Login/Register
              </Button>
            ) : (
              <div className="nav-login-container">
                <p className="nav-login-greeting">hello, {this.context.userData.first_name}</p>
                <Link to="/profile">
                  <Button className="prof-btn">View Profile</Button>
                </Link>
                <Link to="/profile">
                  <Button className="prof-btn">Cart</Button>
                </Link>
                <Button onClick={this.logOut}>LOGOUT</Button>
              </div>
            )}

            <LoginModal action={this.props.action} show={show} onHide={this.handleClose} handleShow={this.handleShow} handleClose={this.handleClose} ></LoginModal>

            {/* <SearchTool searchText="Search by Item #"></SearchTool> */}
          </Navbar.Collapse>
          <p className="gov-id">DUNS: 08-654-7079 | CAGE: 8M1W7</p>
        </Navbar>
          )}
    </ThemeContextConsumer>
    );
  }
}

export default Navigation;
