import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";

// const queryString = require('query-string');


require("dotenv").config();

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gunData: [] || '',
      isLoaded: false,
      catData: [],
      param: '',
      descriptionKeys: [],
      descriptionValues: []
    };
  }

  componentDidMount() {

   console.log(this.props.match.params)

   let param = Object.values(this.props.match.params);
   this.setState({
    param: param
  })

    fetch(`/api/model/${param}`)
      .then(res => res.json())
      .then(json => {
        console.log("json", json)
        // console.log(Object.keys(json.data[0]))
        // var descriptionKeys = Object.keys(json.data[0])
        // var descriptionValues = Object.values(json.data[0])
        // console.log(Array.prototype.push.apply(descriptionKeys,descriptionValues))
        // console.log(descriptionKeys)
        // console.log(Object.values(json.data[0]))
        this.setState({
          gunData: json.data[0],
          isLoaded: true,
        //   descriptionKeys: descriptionKeys,
        //   descriptionValues: descriptionValues
        })
        console.log(this.state.gunData);
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
      });
  };




  render() {

    var { param, descriptionKeys, descriptionValues, gunData } = this.state;
    // const keys = descriptionKeys.map((item1, i) =><li>{item1}</li>);
    // const values = descriptionValues.map((item2, i) =><li>{item2}</li>);
    return (
        <div>
                <Card className="text-center">
                <a href={`/inventory/${gunData.manuf}`}><Button variant="outline-info">back</Button></a>
                    <img className="img-responsive gun-img-detailspg" src={`https://www.davidsonsinc.com/ProdImageSm/${gunData.item_no}.jpg`}></img>
                    <h1 className="retail-price">${gunData.retailprice}</h1>
                        <h1>${gunData.dealerprice}</h1>
                      <h1>{gunData.model}</h1>
                      <h2>{gunData.manuf}</h2>
                      <p>{gunData.caliber}</p>
                      <p>{gunData.features1}</p>
                          <p>{gunData.features2}</p>
                          <p>{gunData.features3}</p>
                          <p>Additional Features:</p>
                          {/*TODO: potentially target this list group with jquery to fill nulls with NA */}
                      <ListGroup horizontal>
                          <ListGroupItem> Frame Material: {gunData.framematerial}</ListGroupItem>
                          <ListGroupItem>Capacity: {gunData.capacity}</ListGroupItem>
                          <ListGroupItem>Stock: {gunData.stock}</ListGroupItem>
                          <ListGroupItem>Mag Type: {gunData.magtype}</ListGroupItem>
                          <ListGroupItem>Overall Length {gunData.overalllength}</ListGroupItem>
                          <ListGroupItem>Sight Front: {gunData.sightfront}</ListGroupItem>
                          <ListGroupItem>Sight Rear: {gunData.sightrear}</ListGroupItem>
                          <ListGroupItem>Trigger Guard: {gunData.triggerguard}</ListGroupItem>
                          <ListGroupItem>Weight: {gunData.weight}</ListGroupItem>
                          <ListGroupItem>Frame Finish: {gunData.finishframe}</ListGroupItem>
                          <ListGroupItem>Class Finish: {gunData.finishclass}</ListGroupItem>
                      </ListGroup>
                </Card>
      </div>

    );
  }
}
export default Details;


