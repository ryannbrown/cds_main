import React, { Component, Fragment } from "react";
import { Col, Row, Container, Card, CardDeck, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
// import Bio from "../components/bio/bio"
// import MobileBoxes from "../components/boxes/boxes"
// import insta from "../media/instagram.png"
// import fbLogo from "../media/fb.jpg"
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
require("dotenv").config();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      isLoading: true,
      // userData: []
      mapIt: [],
      itemDeleted: false
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
    this.setState({
      loggedIn: sessionStorage.getItem("loggedIn"),
      user: sessionStorage.getItem("email")
    })

    fetch(`/profile/${this.state.user}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          userData: json.data[0],
          isLoading: true,
        })

      })


  }
  componentDidUpdate(previousProps, previousState) {

    fetch(`/profile/${this.state.user}`)
      .then(res => res.json())
      .then(json => {
        if (previousState.userData == this.state.userData && this.state.loggedIn) {
          this.setState({
            userData: json.data[0],
            isLoading: false,
            isLoggedIn: true,
            mapIt: json.data[0].saved
          })
        }
      })
  }

  render() {

    const { loggedIn, userData, isLoading, mapIt } = this.state;


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
        <div className="profile-page">
          <Card className="card details-page tc">
            <h1>{userData.first_name} {userData.last_name}'s profile</h1>
            <h3>{userData.email}</h3>
            <h3></h3>


          </Card>
          <Card className="card details-page">




            <OverlayTrigger
              overlay={
                <Tooltip id={`tooltip`}>
                  Save items to your wish list by browsing through our inventory and clicking on the heart on the top left.
        </Tooltip>
              }
            >
                <span><FontAwesomeIcon icon={faInfoCircle} /></span>
            </OverlayTrigger>
            <h1 className="tc">Saved Items</h1>
           
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
            <h2 className="tc">Coming Soon!</h2>



          </Card>
        </div>
      )

    } else {
      return (
        <div className="profile-page tc f1 mt7">Please login to access profile</div>
      )
    }

  }
}


export default Profile;