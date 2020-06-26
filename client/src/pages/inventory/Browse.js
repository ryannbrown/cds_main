import React, { Component } from "react";
import "../Home";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Form } from 'react-bootstrap';

// const queryString = require('query-string');

require("dotenv").config();

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      catData: [],
      param: ''
    };
  }



  fileChanged(event) {
    var f = event.target.value;
    console.log(f)

    window.onload = function(){
      window.location.href= f;
  }   

  window.onload();
    // this.setState({
    //     file: f
    // }, function () { console.log(this.state) });
    // console.log("state",this.state.file)

    // this.handleImage()
}


  componentDidMount() {

   console.log(this.props.match.params)

   let param = Object.values(this.props.match.params);

   this.setState({
     param: param
   })

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

    var { param } = this.state;
// TO DO: Potentialy use Custom Dropdown Component from react bootstrap docs
    // var slug = "/api/inventory/" + {item.manuf};
 const formOptions = this.state.data.map((item, i) =>
 <option key={i} value={`/${param}/${item}`}>{item}</option>
 );

 const items = this.state.data.map((item, i) =><Card>
   <a href={`/${param}/${item}`}>
     <div className="text-center" key={i}>{item}</div></a></Card>
);
    return (
      <div className="deck-wrapper">
        <Form style={{width: '50%', margin: '0px auto'}} >
  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Search by Manufacturer</Form.Label>
    <Form.Control onChange={this.fileChanged.bind(this)} as="select" custom>
      {formOptions}
    </Form.Control>
  </Form.Group>
</Form>
      <CardDeck>
      {items}
      </CardDeck>
    </div>
    );
  }
}

export default Browse;


// const items = this.state.data.map((item, i) =><Card>
// <a href={`/inventory/${item}`}>
//   <div className="text-center" key={i}>{item}</div></a></Card>
// );