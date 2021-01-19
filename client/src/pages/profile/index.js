import React, { Component, Fragment } from "react";
import { Col, Row, Container, Card, CardDeck, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
// import Bio from "../components/bio/bio"
// import MobileBoxes from "../components/boxes/boxes"
// import insta from "../media/instagram.png"
// import fbLogo from "../media/fb.jpg"
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
require("dotenv").config();

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
      showError: false
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





  componentDidMount() {
    let ourContext = this.context;
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

    console.log(ourContext)
  }



  render() {
    let ourContext = this.context;


    const { loggedIn, userData, isLoading, mapIt, showError } = this.state;



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
    if (ourContext.currentCart.lineItems.length > 0) {
      var cartItems = ourContext.currentCart.lineItems.map((item, i) => {

        return (
          <p>{item}</p>
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
            <h2 className="tc">coming soon</h2>
            {cartItems}



          </Card>
          
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
