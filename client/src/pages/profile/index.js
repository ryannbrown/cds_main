import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
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
     state: "hello I am Home's state",
    };
  }

  componentDidMount() {
    this.setState({
      loggedIn: sessionStorage.getItem("loggedIn"),
      user: sessionStorage.getItem("email")
    })
  }



  render() {
    return (
      <Fragment>
      <div className="profile-page">Profile page {this.state.user} </div>

    </Fragment>
    )
} }
    

export default Profile;
