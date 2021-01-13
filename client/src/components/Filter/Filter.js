import React, { Component, useState } from "react";
import "../../pages/Home"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Form, Dropdown, customMenu, customToggle, FormControl } from 'react-bootstrap';
import './style.css'
// const queryString = require('query-string');

require("dotenv").config();

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      catData: [],
      value: '',
      setValue: ''
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

    // console.log(this.props.param)

    let param = (this.props.param);
    this.setState({
     param: param
   })
    fetch(this.props.apiLink)
      .then(res => res.json())
      .then(json => {
        console.log("json", json)

        var size = Object.keys(json.data).length;
        var criteriaVals = [];
        for (var i = 0; i < size; i++) {
          // console.log(Object.values(json.data[i]))
          criteriaVals.push(Object.values(json.data[i]))
        }
        this.setState({
          data: criteriaVals,
          isLoaded: true
        })
        // console.log(this.state.data);
        var size = Object.keys(this.state.data).length;
        // console.log(size);
      });
  };

  componentDidUpdate() {
    // console.log(this.state.value)
  }



  render() {
    var { param } = this.state;

    const items = this.state.data.map((item, i) =><Card>
<a href={this.props.link}>
  <div className="text-center" key={i}>{item}</div></a></Card>
);


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toString().toLowerCase().includes(value),
          )}
        </ul>
      </div>
    );
  },
);
// TO DO: Potentialy use Custom Dropdown Component from react bootstrap docs
    // var slug = "/api/inventory/" + {item.manuf};
 const formOptions = this.state.data.map((item, i) =>
//  <div>{item}</div>
 <Dropdown.Item eventKey={i} href={`/${param}/${item}`}>{item}</Dropdown.Item>
 );


//  const items = this.state.data.map((item, i) =><Card>
//    <a href={`/${param}/${item}`}>
//      <div className="text-center" key={i}>{item}</div></a></Card>
// );
    return (
      <div className="deck-wrapper">
        <Dropdown className="search-filter mt-4" style={{margin: '0px auto'}} >
  {/* <Form.Group controlId="exampleForm.SelectCustom"> */}
      <Dropdown.Toggle as={CustomToggle} className="mt-5" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px', color: 
    'white' }} variant = "basic" id="dropdown-custom-components"> Choose one</Dropdown.Toggle>
     {/* {this.props.text} */}
    <Dropdown.Menu as={CustomMenu} className="dropdown-menu">
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