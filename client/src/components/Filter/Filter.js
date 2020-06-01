import React, { Component } from "react";
import "../../pages/Home"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Form, Dropdown } from 'react-bootstrap';
import './style.css'
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

    console.log(this.props.param)

    let param = (this.props.param);
    this.setState({
     param: param
   })

//    console.log(this.props.match.params)

  //  let param = Object.values(this.props.match.params);
  //  this.setState({
  //   param: param
  // })

    // fetch(`/browse/${param}`)
    // fetch(`/browse/manufacturer`)
    fetch(this.props.link)
      .then(res => res.json())
      .then(json => {
        // console.log("json", json)

        var size = Object.keys(json.data).length;
        var criteriaVals = [];
        for (var i = 0; i < size; i++) {
          // console.log(Object.values(json.data[i]))
          criteriaVals.push(Object.values(json.data[i]))
        }
        // console.log(criteriaVals)
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
        // console.log(this.state.data);
        var size = Object.keys(this.state.data).length;
        console.log(size);
      });
  };




  render() {
    var { param } = this.state;
// TO DO: Potentialy use Custom Dropdown Component from react bootstrap docs
    // var slug = "/api/inventory/" + {item.manuf};
 const formOptions = this.state.data.map((item, i) =>
//  <div>{item}</div>
 <Dropdown.Item href={`/${param}/${item}`}>{item}</Dropdown.Item>
 );

//  const items = this.state.data.map((item, i) =><Card>
//    <a href={`/${param}/${item}`}>
//      <div className="text-center" key={i}>{item}</div></a></Card>
// );
    return (
      <div className="deck-wrapper">
        <Dropdown className="search-filter" style={{margin: '0px auto'}} >
  {/* <Form.Group controlId="exampleForm.SelectCustom"> */}
      <Dropdown.Toggle className="mt-3" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px', color: 
    'white' }} variant = "basic" id="dropdown-basic"> Choose one</Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu">
      {formOptions}
    </Dropdown.Menu>
    {/* <Form.Label>Search by Manufacturer</Form.Label> */}
  {/* </Form.Group> */}
</Dropdown>
    </div>
    );
  }
}

export default Browse;


// const items = this.state.data.map((item, i) =><Card>
// <a href={`/inventory/${item}`}>
//   <div className="text-center" key={i}>{item}</div></a></Card>
// );