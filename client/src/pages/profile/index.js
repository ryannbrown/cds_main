import React, { Component, Fragment } from "react";
import { Col, Row, Container, Card, CardDeck, Tooltip, OverlayTrigger, Spinner, Button, Modal, Alert } from "react-bootstrap";
// import Bio from "../components/bio/bio"
// import MobileBoxes from "../components/boxes/boxes"
// import insta from "../media/instagram.png"
// import fbLogo from "../media/fb.jpg"
import {Link} from "react-router-dom"
import CheckoutModal from "../../components/CheckoutModal/index"
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
require("dotenv").config();
var numeral = require('numeral');

class Profile extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoading: true,
      // userData: []
      mapIt: [],
      itemDeleted: false,
      showError: false,
      cartItems: [],
      show: false,
      setShow: false,
      orderSuccess: false,
      grandTotal: null
    };
  }




  handleDelete = id => {

    if (window.confirm("Are you sure you want to delete this saved item?")) {
      let item_id = id


      const deleteItem = () => {

        // POST TO DB
        fetch('/deletesavedgun', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: item_id,
            email: this.state.userData.email
          })
        })
        this.setState({
          itemDeleted: true,
          // show: false
        })
      }
      deleteItem();
      if (this.state.itemDeleted) {
        window.location.reload();
      }
      // this.fetchPosts()
    }
  }

  handleCheckout = () => {



    this.setState({
      show: true,
      setShow: true,
    });
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

  orderComplete = () => {
    console.log("ORDER COMPLETE")
    this.setState({
      orderSuccess:true
    })
    this.handleClose();

   
  }

  clearCart = () => {
    let ourContext = this.context;
    ourContext.clearCart();
    this.setState({
      cartItems: []
    })
  }


  fetchQuantities = (items) => {


   const computeCost = (guns) => {
    //  console.log(guns)
       var sum = 0
  for (var i= 0; i < guns.length; i++) {
    console.log(guns[i].order_quantity)
    // using numeral library to convert $ values
    sum += numeral(guns[i].sale_price).value() * guns[i].order_quantity;
  }

var grandTotal = sum;

this.setState({grandTotal: grandTotal})
    }
    


    // if (this.state.cartItems.length > 0) {
    //   this.state.cartItems.forEach(element => {
    //    console.log(element)
    //   })
    //   console.log(this.state.cartItems)
    // }
  
    // var n = items.includes("Mango");
console.log(items)
let quantity = items[0]
let guns = items[1]

console.log("quantity", quantity)
console.log("guns", guns)

var itemsProcessed = 0;
quantity.forEach(item => {
  guns.forEach(gun => {

    // console.log(item[0])

    if (gun.uuid.includes(item[0])) {
      gun.order_quantity = item[1]
    }

  })
  itemsProcessed++
 if (itemsProcessed === quantity.length) {
   computeCost(guns);
 }
})







this.setState({
  cartItems: guns
})

console.log('updated guns', guns)
    


// let i = [
//        'a35e4dfd-e2d9-4e88-a127-d6daa0b69064',
//        'bdf83481-41ab-43ae-b416-9958dbb782d4',
//        'd78bd1bb-53fc-4c7b-ab6d-bd5f5f399e41',
//        'a35e4dfd-e2d9-4e88-a127-d6daa0b69064',
//        'c94f500a-c538-45cb-9fbb-73874219e033'
//      ]
// let q = [ '2', '1', '2', '2', '1' ]

//     var rs =  i.reduce(function(result, field, index) {
//       result[q[index]] = field;
//       return result;
//     }, {})
    
//     console.log(rs);

    // console.log(items[0], quantity)
    // console.log(items, quantity)


    // var result =  quantity.reduce(function(result, field, index) {
    //   result[items[index].id] = field;
    //   return result;
    // }, {})
    
    // console.log(result);





// console.log("Fetching quants")
// console.log(quantity)
// const newArray = []
// newArray.push(items);

    // var result =  quantity.reduce(function(result, field, index) {
    //   result[items[index]] = field;
    //   return result;
    // }, {})
    // console.log(result)

// if (newArray) {

// not working.. possibly don't need the for each after it?
// for (var i = 0; i < items.length; i++) {

//     // items.forEach(element => {
//       console.log(items[i], i);
//       items[i].order_quantity = quantity[i]
//     // })
//   }
// }

// this.setState({cartItems: newArray[0]})



// console.log(newArray)

    // if (this.state.cartItems.length > 0) {
    //   this.state.cartItems.forEach(element => {
    //    console.log(element)
    //   })
    //   console.log(this.state.cartItems)
    // }
  
    // var n = items.includes("Mango");

    
    // console.log(items, quantity)

    // var columns = ["Date", "Number", "Size", "Location", "Age"];
    // var rows = ["2001", "5", "Big", "Sydney", "25"];
    // var result =  columns.reduce(function(result, field, index) {
    //   result[rows[index]] = field;
    //   return result;
    // }, {})
    
    // console.log(result);

  }




  componentDidMount() {
    let ourContext = this.context;


let itemz = sessionStorage.getItem("firstItem");
// console.log(itemz)

var firstItem = ourContext.currentCart.lineItems[0];
if (firstItem) {
  sessionStorage.setItem("firstItem", firstItem)
}



  
   
    // sessionStorage.setItem("firstItem", firstItem);

// got to make line items persistent across refreshes
    // if (ourContext.currentCart.lineItems.length > 0) {
    //   if (itemz) {
    //     console.log(itemz)
    //     firstItem = itemz
    //   }
    //   fetch(`/getquote/${firstItem}`)
    //     .then(res => res.json())
    //     .then(json => {
    //       console.log("json", json)
    //       this.setState({
    //           cartItems:json.data,
    //           // isLoading: false
    //       })
    //     })
    // }
    if (ourContext.currentCart.lineItems.length > 0) {
      let items = ourContext.currentCart.lineItems
      let quantity = ourContext.currentCart.quantity;
      // console.log(ourContext.currentCart.lineItems[0])
      fetch('/getquote', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: items,
            quantity: quantity
        })
    }).then(res => res.json())
    .then(response => {
        // console.log("hey i did it")
        if (response.returnArray) {
          console.log(response.returnArray)
            
          // console.log("setting state")
          // this.setState({
          //   // cartItems: response.data
          // },
           this.fetchQuantities(response.returnArray)
        
        }
    })
 
    }

    // console.log(ourContext)

    if (ourContext.userData.email) {
      // console.log("HOWDY")
      this.setState({
        isLoading:false,
        // userData: this.props.userData
        userData: ourContext.userData,
        loggedIn: true
      })
    } else {
      this.setState({
        showError: true
      })
    }

    // console.log(ourContext)
  }

  componentDidUpdate() {
    console.log(this.state.cartItems)
  }


  render() {
    let ourContext = this.context;


    const { loggedIn, userData, isLoading, mapIt, showError, cartItems, show, orderSuccess } = this.state;

    console.log(this.state.cartItems)



    // if (ourContext.currentCart !== null) {
    //   var quantity = ourContext.currentCart.map((item, i) => {
    //     return (
    //       <p>{item}</p>
    //     );
    //   })
    // }

    if (this.state.mapIt) {
      var items = this.state.mapIt.map((item, i) => {

        return (
          <Card key={i} className="saved-card">
            <span onClick={() => this.handleDelete(item)} className="delete-icon"><FontAwesomeIcon icon={faTrash} /></span>
            <a href={`/inventory/model/${item}`}><img className="saved-img" src={`https://www.davidsonsinc.com/Prod_images/${item}.jpg`} /></a>
            <p>Item#: {item}</p>
          </Card>
        );
      })
    }
    // if (ourContext.currentCart.lineItems.length > 0) {
    //   var cartItemss = ourContext.currentCart.lineItems.map((item, i) => {

    //     return (
    //       <p>{item}</p>
    //     );
    //   })
    // }
 
  if (cartItems.length > 0 ) {
  //   var sum = 0
  //   for (var i= 0; i < cartItems.length; i++) {
  //     // console.log(cartItems.order_quantity)
  //     // using numeral library to convert $ values
  //     sum += numeral(cartItems[i].sale_price).value();
  //   }

  // var grandTotal = sum;
      
      // console.log("trying with", cartItems)
      var renderCartItems = cartItems.map((item, i) => {
        return (
          <div className="cart-item">
                <Link to={`/cds/details/${item.uuid}`}>
                <img src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}/>
                  </Link>
            <div className="profile-details">
            <h1>{item.product_name}</h1>
            <h1>{item.sale_price}</h1>
            <h1># In Cart: {item.order_quantity}</h1>
            {/* <h1>{quantity}</h1> */}
            </div>
          </div>
        );
      })
    }

    // if (showError && loggedIn) {
    //   return (
    //     <div className="spinner-box">Trouble Accessing Account</div>
    //   )
    // }

     if (loggedIn && isLoading) {
      return (
<div className="spinner-box">
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          </div> )
    }

    else if (loggedIn) {





      return (
        <ThemeContextConsumer>
        {(context) => (
        <div className="profile-page">
          <Card className="card details-page tc">
            <h1>{context.userData.first_name} {context.userData.last_name}'s profile</h1>
            <h3>{context.userData.email}</h3>
            <h3></h3>


          </Card>
          <Card className="card details-page">

        <OverlayTrigger
              overlay={
                <Tooltip id={`tooltip`}>
                 You will be able to save items to your wish list by browsing through our inventory and clicking on the heart on the top left.
        </Tooltip>
              }
            >
                <span  className="tool-tip"><FontAwesomeIcon icon={faInfoCircle} /></span>
            </OverlayTrigger>
            <h1 className="tc">Saved Items</h1>
            <h2 className="tc">Coming Soon!</h2>
           
            {mapIt ? (
              <CardDeck>
                {items}
              </CardDeck>) : (
                <div><h2>No items saved yet</h2></div>

              )
            }





          </Card>
          <Card className="card details-page">
            <h1 className="tc">My Cart</h1>
            {/* <div className="profile-cart">
            </div> */}
            {renderCartItems}
            <a id="cart"></a>
          {context.currentCart.lineItems.length > 0 ? 
          <div className="cart-btns">
              <h2> Subtotal: ${this.state.grandTotal}</h2>
            <Button onClick={this.clearCart} style={{ fontSize: '24px' }} variant="secondary">Clear Cart</Button>
            {!orderSuccess && <Button onClick={this.handleCheckout} style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Checkout</Button>}
          </div>
          :<div><p>Cart is empty</p></div>}
          {orderSuccess &&
               <Modal.Body>
                   <Alert
                  //  dismissible
                  variant="success"
                  onClose={() => this.setState({orderSuccess: false})}
                >
                  <Alert.Heading>Your order has been placed!</Alert.Heading>
                  <p>
                 An invoice will be sent to your email within 1 business day.
                  </p>
                  <p>
                  if your order contains a firearm, please
                  have your ffl send a copy of their license to ffl@colemandefense.com
                  before the items can be shipped.
                  </p>
                </Alert>
               </Modal.Body>
    }

          </Card>
  
            <CheckoutModal grandTotal={this.state.grandTotal} orderComplete={this.orderComplete} clearCart={this.clearCart} cartItems={this.state.cartItems} action={this.props.action} show={show} onHide={this.handleClose} handleShow={this.handleShow} handleClose={this.handleClose} ></CheckoutModal>
         
        </div>
          )}
          </ThemeContextConsumer>

      )

    } else {
      return (
        <div className="profile-page tc f1 mt7">Please login to access profile</div>
      )
    }

  }
}


export default Profile;
