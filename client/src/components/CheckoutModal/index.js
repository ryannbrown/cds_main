import React, {useState, setShow, Component} from "react"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Modal, Form, Alert } from 'react-bootstrap';
import {
    ThemeContextConsumer,
    ThemeContextProvider,
  } from "../../utils/themeContext";
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
          isWaiting: false
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
    console.log("clicked")
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

  handleSubmit = () => {
    this.setState({
      isWaiting: true
    })

    if (this.props.cartItems.length > 0 ) {
      var sum = 0
      for (var i= 0; i < this.props.cartItems.length; i++) {
        sum += parseFloat(this.props.cartItems[i].sale_price.substring(1));
        // console.log(cartItems[i].sale_price)
      }
    }
      // console.log(sum)
  
    let grandTotal =new Intl.NumberFormat().format(sum);
  


    const ourContext = this.context;

    let email = this.emailRef.current.value;
    let firstName = this.firstName.current.value
    let lastName = this.lastName.current.value
    let billing = this.billingAddress.current.value
    let shipping = this.shippingAddress.current.value

    // console.log(email, password)

    const userPassword = [];

    // e.preventDefault();
    // console.log("handled it")

    const signIn = () => {
      // console.log("posting to DB")
      // POST TO DB
      fetch("/orderitem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // itemNames: this.props.cartItem.product_name,
          // prices: this.props.cartItem.sale_price,
          grandTotal: grandTotal,
          cartItems: this.props.cartItems,
          email: email,
          first_name: firstName,
          last_name: lastName,
          billing: billing,
          shipping: shipping
        }),
      }).then((response) => {
        // console.log("hey i did it")
        // console.log(response)
        if (response.status == "200") {
          console.log("SUCCESS")
            // ourContext.activateUser(email)
            // console.log(email)
            this.props.clearCart();
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


  componentDidMount(){
    console.log("cart modal props", this.props)
  }
  



  render() {
    const {cartItems} = this.props;

  //  let name = this.props.cartItem[0].product_name;
  //   let price = this.props.cartItem[0].sale_price;
// console.log(name)


  if (cartItems.length > 0 ) {
    var sum = 0
    for (var i= 0; i < cartItems.length; i++) {
      sum += parseFloat(cartItems[i].sale_price.substring(1));
      // console.log(cartItems[i].sale_price)
    }
  }
    // console.log(sum)

  var grandTotal =new Intl.NumberFormat().format(sum);



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