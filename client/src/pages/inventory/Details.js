import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Alert, Row, Col } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
import SearchTool from "../../components/searchTool/index"
import DavidsonsDetails from "./davidsonsDetails"
import ZandersDetails from "./zandersDetails"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'

// const queryString = require('query-string');


require("dotenv").config();

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gunData: [] || '',
      isLoading: true,
      errorPage: false,
      saveImage: false,
      catData: [],
      gunSpecs: [],
      param: '',
      descriptionKeys: [],
      descriptionValues: [],
      user: this.props.user,
      userLoaded: false,
      loginAlert: false
    };
  }


  usePlaceholderImg(ev) {
    ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
    console.log(ev);
  }

  fetchAdditionalData = (param) => {
    fetch(`/api/specs/${param}`)
      .then(res => res.json())
      .then(json => {

        this.setState({
          gunSpecs: json.data[0],
          newGunSpecs: json.data[0],
          isLoading: false
        }, console.log(this.state.gunSpecs))

      }
      )
  }

  // TODO: implement scrolling to bottom on click

  scrollPage = () => {

    setTimeout(function () { window.scrollTo(0, 300); }, 250);
  }


  getUserInfo = () => {
    console.log("fetching user info")

    console.log(sessionStorage.getItem("email"))

    // console.log(this.state)
    this.setState({
      loggedIn: sessionStorage.getItem("loggedIn"),
      user: sessionStorage.getItem("email")
    })


    // console.log("what we want for profile")

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

  saveItem = () => {
    let email = this.state.user
    console.log(email)

    if (email) {
      fetch('/savegun', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: this.state.gunData["Item #"],
          email: email,
        })
      }).then(response => {
        console.log("hey i did it")
        console.log(response)
        if (response.status == '200') {
          this.setState({
            saveImage: true
          })

        } else if (response.status == '400') {
          console.log("failed")
        }
      })
    } else {
      this.setState({
        loginAlert: true
      })
    }

  }



  componentDidMount() {
    this.getUserInfo();

    console.log(this.props.match.params)

    let distributor = this.props.match.params.distributor;
    let item_no = this.props.match.params.item_no;

    console.log(item_no)
    this.setState({
      distributor: distributor,
      item_no: item_no
    })

    fetch(`/details/${distributor}/model/${item_no}`)
      .then(res => res.json())
      .then(json => {
        if (json.data[0]) {
          console.log("inventory", json.data[0])
          this.setState({
            gunData: json.data[0],
            isLoading: false,
          })
          var size = Object.keys(this.state.gunData).length;
          // console.log(size);
        } else {
          this.setState({
            errorPage: true,
            isLoading: false
          })
        }
      }).then(this.fetchAdditionalData(item_no))
  };


  componentDidUpdate(previousState) {

    // console.log(this.state.user)
    // console.log("what we want for profile")


    if (previousState.userData == this.state.userData && this.state.loggedIn && this.state.userLoaded) {
      fetch(`/profile/${this.state.user}`)
        .then(res => res.json())
        .then(json => {
          console.log("users", json.data)
          this.setState({
            userData: json.data[0],
            userLoaded: true
  
          })
        })
    }
  }



  render() {


    // console.log(this.state.user)

    const profitMargin = 1.15

    var { param, descriptionKeys, descriptionValues, gunData, gunSpecs, isLoading, errorPage, userData, saveImage, loginAlert } = this.state;

    console.log(gunData)

    // console.log(saveImage)

    // console.log("user loaded?", this.state.userLoaded)


    console.log(gunData);
    var price = (gunData["Dealer Price"] * profitMargin).toFixed(2);


    // if (isLoading) {
    //   return (
    //     <div className="spinner-box">
    //       <Spinner animation="border" role="status">
    //         <span className="sr-only">Loading...</span>
    //       </Spinner>
    //     </div>
    //   )
    // }
    // else if (errorPage) {
    //   return (
    //     <div className="w-50 tc center error-page "><h1 className="mt6">We are sorry but we cannot find what you are looking for.</h1>
    //       <h2>Please ensure you typed it in correctly, otherwise it may have sold. </h2>
    //       <SearchTool searchText="Try again"></SearchTool>
    //       <h1 className="mv5">Additionally, you can use the below tool.</h1>
    //       <BrowseTabber></BrowseTabber>
    //     </div>
    //   )
    // }
    // else {
      return (
        <div className="details-bg">
          { gunData.distributor == 'davidsons' ? (
   <DavidsonsDetails gunSpecs={gunSpecs} gunData={gunData} saveImage={saveImage} saveItem={this.saveItem} loginAlert={loginAlert}></DavidsonsDetails>
          ) :
          <div></div>
          }
          { gunData.distributor == 'zanders' ? (
  <ZandersDetails gunSpecs={gunSpecs} gunData={gunData} saveImage={saveImage} saveItem={this.saveItem} loginAlert={loginAlert}></ZandersDetails>
          ) :
          <div></div>
          }
       
          
            </div>
      )
    }
  }
// }
export default Details;




