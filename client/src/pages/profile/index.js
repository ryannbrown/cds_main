import React, { Component, Fragment } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
// import Bio from "../components/bio/bio"
// import MobileBoxes from "../components/boxes/boxes"
// import insta from "../media/instagram.png"
// import fbLogo from "../media/fb.jpg"
import "./style.css"
require("dotenv").config();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      isLoading: true
    };
  }

  componentDidMount() {
    console.log(this.state)
    this.setState({
      loggedIn: sessionStorage.getItem("loggedIn"),
      user: sessionStorage.getItem("email")
    })


    console.log("what we want for profile")
    fetch(`/profile/${this.state.user}`)
      .then(res => res.json())
      .then(json => {
        console.log("doing the action 1")
        console.log("users", json.data)
        this.setState({
          userData: json.data[0],
          // isLoading: false,
        })
        // var size = Object.keys(this.state.gunData).length;
        // console.log(size);
      })


  }
  componentDidUpdate(previousProps, previousState) {


    console.log(this.state.user)
    console.log("what we want for profile")
    fetch(`/profile/${this.state.user}`)
      .then(res => res.json())
      .then(json => {
        console.log("users", json.data)
        if (previousState.userData == this.state.userData && this.state.loggedIn) {
          //  console.log("oh well hello there")
          this.setState({
            userData: json.data[0],
            isLoading: false,
            isLoggedIn: true,
          })
        }
      })
  }

  render() {

    const { loggedIn, userData, isLoading } = this.state;

    console.log(userData)

    if (loggedIn && isLoading) {
      return (

        <div>Loading</div>
      )
    }

    else if (loggedIn) {
      return (
        <div className="profile-page">
          <Card className="card details-page">
            <h1 className="tc">My Profile</h1>
            <h3>Email: {userData.email}</h3>
            <h3>First Name:  {userData.first_name}</h3>
            <h3>Last Name:  {userData.last_name}</h3>


          </Card>
        </div>
      )

    } else {
      return (
        <div className="profile-page tc f1 mt4">Please login to access profile</div>
      )
    }

  }
}


export default Profile;
