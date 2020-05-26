import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion } from 'react-bootstrap';
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
      isLoaded: false,
      catData: [],
      gunSpecs: [],
      param: '',
      descriptionKeys: [],
      descriptionValues: []
    };
  }


  fetchAdditionalData = (param) => {
    fetch(`/api/specs/${param}`)
      .then(res => res.json())
      .then(json => {
        console.log("specs", json.data[0])
        this.setState({
          gunSpecs: json.data[0],
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
          isLoaded: true,
        })
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
      }).then(this.fetchAdditionalData(param))
  };




  render() {

    var { param, descriptionKeys, descriptionValues, gunData, gunSpecs } = this.state;

    // gunData.dealer_price = this.state.gunData.dealer_price * 1.25;

    // const dealerPrice = this.state.gunData.msp;
    // console.log(Number(dealerPrice));
    // gunDat.replace(/[$,]+/g,"");
    // var result = parseFloat(currency) + .05;

    return (
      <div className="">
        <Card className="text-center details-page">
          {/* <a href={`/inventory/${gunData.manuf}`}><Button variant="outline-info">back</Button></a> */}
          <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/Prod_images/${gunData.item_no}.jpg`}></img>
          {/* <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/ProdImageSm/${gunData.item_no}.jpg`}></img> */}
          <h2 className="retail-price">{gunData.retail_price}</h2>
          <h1>{gunData.dealer_price}</h1>
          <h1>{gunData.model}</h1>
          <h1>{gunData.model_series}</h1>
          <h2>{gunData.gun_type}</h2>
          <h2>{gunData.manufacturer}</h2>
          <h3>{gunData.caliber}</h3>
          <h3>{gunData.gun_action}</h3>
          <p>{gunData.features}</p>
          <p>{gunData.finish}</p>
      { gunSpecs? (

<Accordion>
<Card>
  <Accordion.Toggle className="additionalinfo-btn" as={Button} variant="button" eventKey="0" onClick={this.scrollPage}>
    <a>Click for Additional information</a>
                </Accordion.Toggle>
  <Accordion.Collapse eventKey="0">
    <Card.Body className="description-list">
      <ListGroup variant= "flush" style= {{width:'50%', margin: '0px auto'}}>
        <ListGroupItem>Features: <br></br>{gunSpecs.features1} <br></br>{gunSpecs.features2} <br></br> {gunSpecs.features3}</ListGroupItem>
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
      ) : ( 
<div></div>
  )}
      </Card>
      <BrowseTabber/>
      </div>
    )
      }
    }
export default Details;


