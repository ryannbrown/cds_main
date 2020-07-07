import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Alert, Row, Col } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
import SearchTool from "../../components/searchTool/index"
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


    // console.log(saveImage)

    // console.log("user loaded?", this.state.userLoaded)


    console.log(gunData);
    var price = (gunData["Dealer Price"] * profitMargin).toFixed(2);


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
        <div className="details-bg">

          {gunSpecs ? (
            <div className="details-page">

              <Row>
                <Col>
                  <a className="back-link" href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                  <h1 className="pt4">{gunData["Item Description"]}</h1>
                  <p style={{marginBottom:'0px'}}>{gunData.features}</p>
                  <p>Finish: {gunData.finish}</p>
                  </Col>
              </Row>
              {/* <Card className="text-center details-page"> */}

              <Row>
                <Col className="img-container" sm={12} md={8} >
                  {saveImage ? (
                    <FontAwesomeIcon icon={faCheck}
                      //  onClick={this.saveItem} TODO: NEED TO BE ABLE TO DELETE
                      className="w-25 fa-icon"></FontAwesomeIcon>

                  ) : (
                      <FontAwesomeIcon icon={faHeart} onClick={this.saveItem} className="w-25 fa-icon"></FontAwesomeIcon>
                    )}
                  {loginAlert ? (
                    <Alert variant="warning">
                      {/* Please login to save items to your profile */}
                  Feature Coming Soon!
                    </Alert>
                  ) : (
                      <div></div>
                    )}
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
                  }</Col>


                <Col className="price-box" sm={12} md={4}>

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
                  <h4>{gunData.total_quantity} In Stock</h4>
                  
                </Col>
              </Row>

              <Row>
                <Col>
            
                    <Card.Body className="description-list">
                      <Col>
                        <ul className="desc-list">
               
                          {gunData.features1 ? (
                            <li className="list-item">{gunSpecs.features1}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunData.features2 ? (
                            <li className="list-item">{gunSpecs.features2}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunData.features3 ? (
                            <li className="list-item">{gunSpecs.features3}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.framematerial ? (
                            <li className="list-item"> Frame Material: {gunSpecs.framematerial}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.capacity ? (
                            <li className="list-item">Capacity: {gunSpecs.capacity}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.stock ? (
                          <li className="list-item">Stock: {gunSpecs.stock}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.magtype ? (
                            <li className="list-item">Mag Type: {gunSpecs.magtype}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.overalllength ? (
                            <li className="list-item">Overall Length: {gunSpecs.overalllength}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.sightfront ? (
                             <li className="list-item">Sight Front: {gunSpecs.sightfront}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.sightrear ? (
                               <li className="list-item">Sight Rear: {gunSpecs.sightrear}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.triggerguard ? (
                            <li className="list-item">Trigger Guard: {gunSpecs.triggerguard}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.finishframe ? (
                            <li className="list-item">Frame Finish: {gunSpecs.finishframe}</li>
                          ) : (
                              <div></div>
                            )
                          }
                          {gunSpecs.finishclass ? (
                           <li className="list-item">Class Finish: {gunSpecs.finishclass}</li>
                          ) : (
                              <div></div>
                            )
                          }
                         
                        </ul>
                      </Col>
                      <a name="scrolltobottom"></a>
                    </Card.Body>
             
                </Col>
              </Row>
              <Row>
                <Col>
                <h2 className="pa4" style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData["Item #"]}</h2>
                <p><i>"Add to Cart" Coming Soon</i></p>
                </Col>
              </Row>
         
              <BrowseTabber title="Revise Search" />
            </div>
          ) : (
        

              <div className="details-page">
  
                <Row>
                  <Col>
                    <a className="back-link" href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                    <h1 className="pt4">{gunData["Item Description"]}</h1>
                    <p style={{marginBottom:'0px'}}>{gunData.features}</p>
                    <p>Finish: {gunData.finish}</p>
                    </Col>
                </Row>
                {/* <Card className="text-center details-page"> */}
  
                <Row>
                  <Col className="img-container" sm={12} md={8} >
                    {saveImage ? (
                      <FontAwesomeIcon icon={faCheck}
                        //  onClick={this.saveItem} TODO: NEED TO BE ABLE TO DELETE
                        className="w-25"></FontAwesomeIcon>
  
                    ) : (
                        <FontAwesomeIcon icon={faHeart} onClick={this.saveItem} className="w-25"></FontAwesomeIcon>
                      )}
                    {loginAlert ? (
                      <Alert variant="warning">
                        {/* Please login to save items to your profile */}
                    Feature Coming Soon!
                      </Alert>
                    ) : (
                        <div></div>
                      )}
                   <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/Prod_images/${gunData["Item #"]}.jpg`} onError={this.usePlaceholderImg}></img>
                    
                    </Col>
  
  
                  <Col className="price-box" sm={12} md={4}>
  
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
                    <h4>{gunData.total_quantity} In Stock</h4>
                    
                  </Col>
                </Row>
                <Row>
                <Col>
                <h2 className="pa4" style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData["Item #"]}</h2>
                <p><i>"Add to Cart" Coming Soon</i></p>
                </Col>
              </Row>
         
              <BrowseTabber title="Revise Search" />
        </div>
            )}
            </div>
      )
    }
  }
}
export default Details;




