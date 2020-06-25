import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
import SearchTool from "../../components/searchTool/index"

// const queryString = require('query-string');


require("dotenv").config();

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gunData: [] || '',
      isLoading: true,
      errorPage: false,
      catData: [],
      gunSpecs: [],
      param: '',
      descriptionKeys: [],
      descriptionValues: [],
      user: this.props.user
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
    fetch('/savegun', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: `https://www.davidsonsinc.com/Prod_images/${this.state.gunSpecs.image1}`,
        email: email,
      })
  }).then(response => {
      console.log("hey i did it")
      console.log(response)
      if (response.status == '200') {
          console.log("saved")

      } else if (response.status == '400') {
          console.log("failed")
      }
  })
  }



  componentDidMount() {
    this.getUserInfo();

    // console.log(this.props.match.params)

    let param = Object.values(this.props.match.params);
    this.setState({
      param: param
    })

    fetch(`/davidsons/model/${param}`)
      .then(res => res.json())
      .then(json => {
        if (json.data[0]) {
          // console.log("inventory", json.data[0])
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
      }).then(this.fetchAdditionalData(param))
  };


  componentDidUpdate(previousState) {

    // console.log(this.state.user)
    // console.log("what we want for profile")


        if (previousState.userData == this.state.userData && this.state.loggedIn && this.state.userLoaded) {
          fetch(`/profile/${this.state.user}`)
          .then(res => res.json())
          .then(json => {
            console.log("users", json.data)
          //  console.log("oh well hello there")
          this.setState({
            userData: json.data[0],
            userLoaded:true
            // isLoading: false,
            // isLoggedIn: true,
          })
        })
      }
  }



  render() {


    console.log(this.state.user)

    const profitMargin = 1.15

    var { param, descriptionKeys, descriptionValues, gunData, gunSpecs, isLoading, errorPage, userData } = this.state;


    // console.log(errorPage)


    // console.log(gunData);
    var price = (gunData["Dealer Price"] * profitMargin).toFixed(2);


    // gunData.dealer_price = this.state.gunData.dealer_price * 1.25;

    // const dealerPrice = this.state.gunData.msp;
    // console.log(Number(dealerPrice));
    // gunDat.replace(/[$,]+/g,"");
    // var result = parseFloat(currency) + .05;

    if (isLoading) {
      return (
        <div className="spinner-box">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    }
    else if (errorPage) {
      return (
        <div className="w-50 tc center error-page "><h1 className="mt6">We are sorry but we cannot find what you are looking for.</h1>
          <h2>Please ensure you typed it in correctly, otherwise it may have sold. </h2>
          <SearchTool searchText="Try again"></SearchTool>
          <h1 className="mv5">Additionally, you can use the below tool.</h1>
          <BrowseTabber></BrowseTabber>
        </div>
      )
    }
    else {
      return (
        <div className="">



          {gunSpecs ? (
            <div className="details">
              <Card className="text-center details-page">
                <Button onClick={this.saveItem} className="w-25">Save</Button>
                <a href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                <h1 className="pt4">{gunData["Item Description"]}</h1>
                {/* <a href={`/inventory/${gunData.manuf}`}><Button variant="outline-info">back</Button></a> */}
                {
                  gunSpecs.image1 ? (
                    <img className="gun-img" alt={`${gunSpecs.itemdesc1}`}
                      // TODO: come up with better way to get images than this solution
                      src={`https://www.davidsonsinc.com/Prod_images/${gunSpecs.image1}`}
                      onError={this.usePlaceholderImg}
                    />
                  ) : (

                      <img className="gun-img" alt={`${gunSpecs.itemdesc1}`}
                        // TODO: come up with better way to get images than this solution
                        src={`https://www.davidsonsinc.com/Prod_images/${gunData["Item #"]}.jpg`}
                        onError={this.usePlaceholderImg}
                      />
                    )
                }
                {/* <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/Prod_images/${gunData["Item #"]}.jpg`} onError={this.usePlaceholderImg}></img> */}
                {/* <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/ProdImageSm/${gunData.item_no}.jpg`}></img> */}
                <h2 className="retail-price">${gunData["Retail Price"]}</h2>
                {gunSpecs.retailmap > 0 ? (
                  <h1 className="text-center">${gunSpecs.retailmap}</h1>
                ) : (
                    <h1>${price}</h1>
                  )
                }
                <h1>{gunData.model}</h1>
                <h1>{gunData["Model Series"]}</h1>
                <h2>{gunData["Gun Type"]}</h2>
                <h2>{gunData.manufacturer}</h2>
                <h3>{gunData.caliber}</h3>
                <h3>{gunData["Gun Action"]}</h3>
                <p>{gunData.features}</p>
                <p>Finish: {gunData.finish}</p>
                <h2 style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData["Item #"]}</h2>

                <Accordion>
                  <Card>
                    <Accordion.Toggle className="additionalinfo-btn" as={Button} variant="button" eventKey="0" onClick={this.scrollPage}>
                      <a>Click for Additional information</a>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body className="description-list">
                        <ListGroup variant="flush" style={{ width: '50%', margin: '0px auto' }}>
                          <p>Features:</p>
                          {gunData.features1 ? (
                            <ListGroupItem>{gunSpecs.features1}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunData.features2 ? (
                            <ListGroupItem>{gunSpecs.features2}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunData.features3 ? (
                            <ListGroupItem>{gunSpecs.features3}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                          }
                          <ListGroupItem> Frame Material: {gunSpecs.framematerial}</ListGroupItem>
                          <ListGroupItem>Capacity: {gunSpecs.capacity}</ListGroupItem>
                          <ListGroupItem>Stock: {gunSpecs.stock}</ListGroupItem>
                          <ListGroupItem>Mag Type: {gunSpecs.magtype}</ListGroupItem>
                          <ListGroupItem>Overall Length {gunSpecs.overalllength}</ListGroupItem>
                          <ListGroupItem>Sight Front: {gunSpecs.sightfront}</ListGroupItem>
                          <ListGroupItem>Sight Rear: {gunSpecs.sightrear}</ListGroupItem>
                          <ListGroupItem>Trigger Guard: {gunSpecs.triggerguard}</ListGroupItem>
                          <ListGroupItem>Weight: {gunSpecs.weight}</ListGroupItem>
                          <ListGroupItem>Frame Finish: {gunSpecs.finishframe}</ListGroupItem>
                          <ListGroupItem>Class Finish: {gunSpecs.finishclass}</ListGroupItem>
                        </ListGroup>
                        <a name="scrolltobottom"></a>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

              </Card>
              <BrowseTabber title="Revise Search" />
            </div>
          ) : (
              <div className="details">
                <Card className="text-center details-page">
                  <a href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                  {/* <a href={`/inventory/${gunData.manuf}`}><Button variant="outline-info">back</Button></a> */}
                  <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/Prod_images/${gunData["Item #"]}.jpg`} onError={this.usePlaceholderImg}></img>
                  {/* <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/ProdImageSm/${gunData.item_no}.jpg`}></img> */}
                  <h2 className="retail-price">${gunData["Retail Price"]}</h2>
                  {gunData.retailmap > 0 ? (
                    <h1 className="text-center">${gunSpecs.retailmap}</h1>
                  ) : (
                      <h1>${price}</h1>
                    )
                  }

                  <h1>{gunData.model}</h1>
                  <h1>{gunData["Model Series"]}</h1>
                  <h2>{gunData["Gun Type"]}</h2>
                  <h2>{gunData.manufacturer}</h2>
                  <h3>{gunData.caliber}</h3>
                  <h3>{gunData["Gun Action"]}</h3>
                  <p>{gunData.features}</p>
                  <p>{gunData.finish}</p>
                  <h2 style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData["Item #"]}</h2>
                </Card>
                <BrowseTabber title="Revise Search" />
              </div>
            )}
        </div>
      )
    }
  }
}
export default Details;


