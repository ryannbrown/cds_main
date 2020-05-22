import React, { Component } from "react";
import "../Home";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';

// const queryString = require('query-string');

require("dotenv").config();

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      catData: []
    };
  }

  componentDidMount() {

   console.log(this.props.match.params)

   let param = Object.values(this.props.match.params);

    fetch(`/browse/${param}`)
      .then(res => res.json())
      .then(json => {
        console.log("json", json)

        var size = Object.keys(json.data).length;
        var criteriaVals = [];
        for (var i = 0; i < size; i++) {
          // console.log(Object.values(json.data[i]))
          criteriaVals.push(Object.values(json.data[i]))
        }
        console.log(criteriaVals)
        // var descriptionValues = Object.values(json.data)
        //  console.log(Object.keys(json.data[0]))
        // var descriptionKeys = Object.keys(json.data[0])
        // var descriptionValues = Object.values(json.data[0])
        // console.log(Array.prototype.push.apply(descriptionKeys,descriptionValues))
        // console.log(descriptionKeys)
        // console.log(descriptionValues)
        // console.log(Object.values(json.data[0]))
        this.setState({
          data: criteriaVals,
          isLoaded: true
        })
        console.log(this.state.data);
        var size = Object.keys(this.state.data).length;
        console.log(size);
      });
  };




  render() {

    // var slug = "/api/inventory/" + {item.manuf};
 const items = this.state.data.map((item, i) =><Card>
   <a href={`/inventory/${item}`}>
     <div className="text-center" key={i}>{item}</div></a></Card>
);
    return (
      <div className="deck-wrapper">
      <CardDeck>
      {items}
      </CardDeck>
    </div>
    );
  }
}

export default Browse;
