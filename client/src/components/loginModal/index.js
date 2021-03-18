import React, {useState, setShow, Component} from "react"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Modal, Form, Alert } from 'react-bootstrap';
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
class LoginModal extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
      super(props);
      this.state = {
          state: "hello I am Home's state",
          setShow: false,
          show: false,
          loggedInState: this.props.loggedInState,
          user: null,
        //   userLoggedIn: this.props.userLoggedIn

      };
      this.handleSubmit = this.handleSubmit.bind(this);
    //   this.fileChanged = this.fileChanged.bind(this);
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

    let email = this.emailRef.current.value.toLowerCase();
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
            ourContext.activateUser(email)
            // console.log(email)
            this.props.handleClose();
            // if (this.props.userLoggedIn) {
                this.setState({
                    // userLoggedIn: true,
                    // user: email,
                    show: false,
                    setShow:false,
                    showLoginAlert: false,
                  });
            // }
          // console.log(email);
         
          // sessionStorage.setItem("name", postData.name);
          // sessionStorage.setItem("email", email);
          // sessionStorage.setItem("loggedIn", true);

          

        //   this.props.action(email);
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

  
  

  render() {


    return (


      <div>
<Modal
              show={this.props.show}
              onHide={this.props.handleClose}
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
                <Button variant="secondary" onClick={this.props.handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
    </div>
    );
  }
}
export default LoginModal;