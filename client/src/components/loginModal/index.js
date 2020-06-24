import React, {useState, setShow, Component} from "react"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Modal, Form } from 'react-bootstrap';

class LoginModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
          state: "hello I am Home's state",
          handleShow: false,
          show: false,
          loggedInState: this.props.loggedInState,
          user: null

      };
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.fileChanged = this.fileChanged.bind(this);
      this.emailRef = React.createRef();
      this.passwordRef = React.createRef();
   
  }


  handleSubmit = (e) => {

    let email = this.emailRef.current.value
    let password = this.passwordRef.current.value
  

    
  
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
              this.setState({
                loggedInState: true,
                user: email,
                setShow: false
              })
              // setLoggedInState(true);
              // TODO: Make it users name instead of email
            //  setUser(email);
              // setShow(false);
              // alert("success")
            } else if (response.status == '400') {
               alert("incorrect email/password")
            }
        })
  
    }
  signIn();
  
  
    }

     logOut = () =>{
      this.setState({
        loggedInState: false
      })
    }
  
  

  render() {

 

    // const [modalShow, setModalShow] = useState(false);
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (


      // {!loggedInState ? (
      //   <Button variant="primary" onClick={handleShow}>
      //   Login/Register
      // </Button>
      //       ) : (
      //         <div>
      //           <div>hello, {user}</div>
      //           <a href="/profile"><Button>View Profile</Button></a>
      //          <Button onClick={logOut}>LOGOUT</Button>
      //         </div>
              
      //       )}
      <div>

            {/* <div>
              <div>hello</div>
              <a href="/profile"><Button>View Profile</Button></a>
              <Button onClick={this.logOut}>LOGOUT</Button>
              </div> */}
<Button variant="primary" onClick={this.handleShow}>Click Me</Button>
      <Modal
      show={this.state.show}
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
        <div>
          Returning Customer? Login Below
   </div>

        <form onSubmit={this.handleSubmit} encType="multipart/form-data" >

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" ref={this.emailRef} placeholder="email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="text" ref={this.passwordRef} placeholder="password" />
          </Form.Group>
        </form>
        <h2>New Customer?</h2>
        <a href="/cds/registration"><Button>Register Here</Button></a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
          Close
    </Button>
        <Button variant="primary" onClick={this.handleSubmit}>Login</Button>
      </Modal.Footer>
    </Modal>
    </div>
    );
  }
}
export default LoginModal;