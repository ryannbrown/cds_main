import React, { useState, setShow, Component } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Image,
  CardDeck,
  Table,
  Accordion,
  Spinner,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
var numeral = require("numeral");
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
      orderSuccess: false,
      failedVal: false
      //   userLoggedIn: this.props.userLoggedIn
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //   this.fileChanged = this.fileChanged.bind(this);
    this.emailRef = React.createRef();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.shippingAddress = React.createRef();
    this.billingAddress = React.createRef();
    this.street = React.createRef();
    this.city = React.createRef();
    this.state = React.createRef();
    this.zip = React.createRef();
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
      isWaiting: true,
    });

    if (this.props.cartItems.length > 0) {
      var sum = 0;
      for (var i = 0; i < this.props.cartItems.length; i++) {
        // using numeral library to convert $ values
        sum += numeral(this.props.cartItems[i].sale_price).value();
      }
    }

    var grandTotal = sum;

    const ourContext = this.context;

    let email = this.emailRef.current.value;
    let firstName = this.firstName.current.value;
    let lastName = this.lastName.current.value;
    let street = this.street.current.value;
    let city = this.city.current.value;
    let state = this.state.current.value;
    let zip = this.zip.current.value;

    if (!firstName || !lastName || !street || !city || !state || !zip) {
      this.setState({failedVal: true, isWaiting:false})
      return;
    }

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
          street,
          city,
          state,
          zip,
          // billing: billing,
          // shipping: shipping,
          theGrandTotal: this.props.grandTotal,
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

  componentDidMount() {
    // console.log("cart modal props", this.props)
  }

  componentDidUpdate() {
    // console.log("modal state update", this.state)
  }

  render() {
    const { orderSuccess } = this.state;
    const { cartItems } = this.props;

    // if (cartItems.length > 0 ) {
    //   var sum = 0
    //   for (var i= 0; i < cartItems.length; i++) {
    //     // using numeral library to convert $ values
    //     sum += numeral(cartItems[i].sale_price).value();
    //   }
    // }

    // var grandTotal = sum;

    var renderCartItems = cartItems.map((item, i) => {
      return (
        <div className="cart-item">
          <div className="profile-details">
            <h1>{item.product_name}</h1>
            <h1>
              {item.sale_price} X {item.order_quantity}
            </h1>
          </div>
        </div>
      );
    });

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
                      value={context.userData.email}
                      required="true"
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
                      required="true"
                    />
                  </Form.Group>
                  {/* <Form.Group controlId="formBilling">
                    <Form.Control
                    pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,10}$" required
                      type="text"
                      ref={this.billingAddress}
                      placeholder="Billing Address"
                    />
                  </Form.Group> */}
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Group controlId="formShipping">
                    <Form.Control
                      type="text"
                      ref={this.street}
                      placeholder="Street Address"
                      required="true"
                    />
                  </Form.Group>
                  <Form.Group controlId="formShipping">
                    <Form.Control
                      type="text"
                      ref={this.city}
                      placeholder="City"
                      required="true"
                    />
                  </Form.Group>
                  <Form.Control
                    className="state"
                    ref={this.state}
                    as="select"
                    required="true"
                  >
                    <option selected="true" disabled>
                      State
                    </option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </Form.Control>
                  <Form.Group className="zip" controlId="formShipping">
                    <Form.Control
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required="true"
                      type="text"
                      ref={this.zip}
                      placeholder="Zip"
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
                {this.state.failedVal && <p style={{color:'red'}}>Please fill out all fields</p>}
                <p>*Subtotal does not include taxes, fees, or shipping.</p>
                <p>
                  This is not a final payment. Total price will be sent to you
                  with invoice within approximately 1 business day.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  {this.state.isWaiting ? (
                    <Spinner animation="border" role="status">
                      {/* <span className="sr-only">Placing Order</span> */}
                    </Spinner>
                  ) : (
                    <p style={{ marginBlockEnd: "0" }}>
                      Request Invoice | Subtotal: ${this.props.grandTotal}
                    </p>
                  )}
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
