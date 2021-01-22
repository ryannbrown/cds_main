import React, {useState, setShow, Component} from "react"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Modal, Form, Alert } from 'react-bootstrap';
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
  var numeral = require('numeral');
class CheckoutModal extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
      super(props);
      this.state = {
          state: "hello I am Home's state",
          setShow: false,
          show: false,
          loggedInState: this.props.loggedInState,
          user: null,
          isWaiting: false,
          orderSuccess: false
        //   userLoggedIn: this.props.userLoggedIn

      };
      this.handleSubmit = this.handleSubmit.bind(this);
    //   this.fileChanged = this.fileChanged.bind(this);
      this.emailRef = React.createRef();
      this.firstName= React.createRef();
      this.lastName = React.createRef();
      this.shippingAddress = React.createRef();
      this.billingAddress = React.createRef();
   
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
    e.preventDefault();

    this.setState({
      isWaiting: true
    })

    if (this.props.cartItems.length > 0 ) {
      var sum = 0
      for (var i= 0; i < this.props.cartItems.length; i++) {
        // using numeral library to convert $ values
        sum += numeral(this.props.cartItems[i].sale_price).value();
      }
    }
  
    var grandTotal = sum;


    const ourContext = this.context;

    let email = this.emailRef.current.value;
    let firstName = this.firstName.current.value
    let lastName = this.lastName.current.value
    let billing = this.billingAddress.current.value
    let shipping = this.shippingAddress.current.value

  

    const signIn = () => {

      fetch("/orderitem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
    
          grandTotal: grandTotal,
          cartItems: this.props.cartItems,
          email: email,
          first_name: firstName,
          last_name: lastName,
          billing: billing,
          shipping: shipping
        }),
      }).then((response) => {

        if (response.status == "200") {
          // console.log("SUCCESS")
            this.props.orderComplete();
            // this.props.clearCart();
      
        } else if (response.status == "400") {
          this.setState({
            showLoginAlert: true,
          });
        } else {
          // console.log("we got here")
        }
      });
    };
    signIn();
  };


  componentDidMount(){
    // console.log("cart modal props", this.props)
  }

  componentDidUpdate(){
    // console.log("modal state update", this.state)
  }
  



  render() {
    const {orderSuccess} = this.state;
    const {cartItems} = this.props;


  if (cartItems.length > 0 ) {
    var sum = 0
    for (var i= 0; i < cartItems.length; i++) {
      // using numeral library to convert $ values
      sum += numeral(cartItems[i].sale_price).value();
    }
  }

  var grandTotal = sum;


var renderCartItems = cartItems.map((item, i) => {
  return (
    <div className="cart-item">
      <div className="profile-details">
      <h1>{item.product_name}</h1>
      <h1>{item.sale_price}</h1>
      </div>
    </div>
  );
})



    return (
      <ThemeContextConsumer>
      {(context) => (

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
                <Modal.Title>Checkout</Modal.Title>
              </Modal.Header>
              
              <Modal.Body>
                {renderCartItems}
                {/* <h2>Item: {name}</h2> */}
                {/* <h2>Subtotal: {price}*</h2> */}
                {/* <p>*Not including applicable taxes and shipping costs</p> */}
                <br></br>
                <p>Please fill out the form below to submit this order</p>
                <form
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data"
                >
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      ref={this.emailRef}
                      placeholder="email"
                      value = {context.userData.email}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFirstName">
                    <Form.Control
                      type="text"
                      ref={this.firstName}
                      value={context.userData.first_name}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Control
                      type="text"
                      ref={this.lastName}
                      value={context.userData.last_name}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBilling">
                    <Form.Control
                    pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,10}$" required
                      type="text"
                      ref={this.billingAddress}
                      placeholder="Billing Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="formShipping">
                    <Form.Control
                    pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,10}$" required
                      type="text"
                      ref={this.shippingAddress}
                      placeholder="Shipping Address"
                    />
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check  ref={this.addressMatch} type="checkbox" label="Check if Shipping Address is the same as billing" />
                        </Form.Group> */}
                </form>
                {/* {this.state.showLoginAlert &&
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
                } */}
                <p>*Subtotal does not include taxes, fees, or shipping.</p>
                <p>This is not a final payment. Total price will be sent to you with invoice within approximately 1 business day.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                  Close
                </Button>
                  <Button variant="primary" onClick={this.handleSubmit}>
                  {this.state.isWaiting ? <Spinner animation="border" role="status">
                 {/* <span className="sr-only">Placing Order</span> */}
               </Spinner> : <p style={{marginBlockEnd: '0'}}>Request Invoice | Subtotal: ${grandTotal}</p>}
                     </Button>
              
              </Modal.Footer>
            </Modal>
    </div>
            )}
            </ThemeContextConsumer>
    );
  }
}
export default CheckoutModal;