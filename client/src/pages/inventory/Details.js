import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";

// const queryString = require('query-string');


require("dotenv").config();

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gunData: [] || '',
      isLoading: true,
      catData: [],
      gunSpecs: [],
      param: '',
      descriptionKeys: [],
      descriptionValues: []
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
        console.log("specs", json.data[0])
        this.setState({
          gunSpecs: json.data[0],
          isLoading: false
        }, console.log(this.state.gunSpecs))
      }
      )
  }

  // TODO: implement scrolling to bottom on click

  //   scrollPage = () => {
  //     var scrollingElement = (document.scrollingElement || document.body);
  // scrollingElement.scrollTop = scrollingElement.scrollHeight;
  //     console.log("clicked")
  //   }

  componentDidMount() {

    console.log(this.props.match.params)

    let param = Object.values(this.props.match.params);
    this.setState({
      param: param
    })

    fetch(`/api/model/${param}`)
      .then(res => res.json())
      .then(json => {
        console.log("inventory", json.data[0])
        this.setState({
          gunData: json.data[0],
          // isLoading: false,
        })
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
      }).then(this.fetchAdditionalData(param))
  };




  render() {

    const profitMargin = 1.15

    var { param, descriptionKeys, descriptionValues, gunData, gunSpecs, isLoading } = this.state;


    var price = (gunData.dealer_price * profitMargin).toFixed(2);


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
    else {
      return (
        <div className="">



          {gunSpecs ? (
            <div>
              <Card className="text-center details-page">
                <a href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                {/* <a href={`/inventory/${gunData.manuf}`}><Button variant="outline-info">back</Button></a> */}
                <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/Prod_images/${gunData.item_no}.jpg`} onError={this.usePlaceholderImg}></img>
                {/* <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/ProdImageSm/${gunData.item_no}.jpg`}></img> */}
                <h2 className="retail-price">${gunData.retail_price}</h2>
                {gunSpecs.retailmap > 0 ? (
                  <h1 className="text-center">${gunSpecs.retailmap}</h1>
                ) : (
                    <h1>${price}</h1>
                  )
                }
                <h1>{gunData.model}</h1>
                <h1>{gunData.model_series}</h1>
                <h2>{gunData.gun_type}</h2>
                <h2>{gunData.manufacturer}</h2>
                <h3>{gunData.caliber}</h3>
                <h3>{gunData.gun_action}</h3>
                <p>{gunData.features}</p>
                <p>{gunData.finish}</p>


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
              <BrowseTabber />
            </div>
          ) : (
              <div>
                <Card className="text-center details-page">
                  <a href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                  {/* <a href={`/inventory/${gunData.manuf}`}><Button variant="outline-info">back</Button></a> */}
                  <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/Prod_images/${gunData.item_no}.jpg`} onError={this.usePlaceholderImg}></img>
                  {/* <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/ProdImageSm/${gunData.item_no}.jpg`}></img> */}
                  <h2 className="retail-price">${gunData.retail_price}</h2>
                  {gunData.retailmap > 0 ? (
                    <h1 className="text-center">${gunSpecs.retailmap}</h1>
                  ) : (
                      <h1>${price}</h1>
                    )
                  }

                  <h1>{gunData.model}</h1>
                  <h1>{gunData.model_series}</h1>
                  <h2>{gunData.gun_type}</h2>
                  <h2>{gunData.manufacturer}</h2>
                  <h3>{gunData.caliber}</h3>
                  <h3>{gunData.gun_action}</h3>
                  <p>{gunData.features}</p>
                  <p>{gunData.finish}</p>
                </Card>
                <BrowseTabber />
              </div>
            )}
        </div>
      )
    }
  }
}
export default Details;


