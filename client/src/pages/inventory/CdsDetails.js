import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from '../../components/BrowseTabber/BrowseTabber'

// const queryString = require('query-string');


require("dotenv").config();

class CdsDetails extends Component {
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


  componentDidMount() {

    console.log(this.props.match.params)

    let param = Object.values(this.props.match.params);
    console.log(param)
    this.setState({
      param: param
    })

    fetch(`/api/posts/${param}`)
      .then(res => res.json())
      .then(json => {
        console.log("inventory", json.data[0])
        this.setState({
          gunData: json.data[0],
          isLoaded: true,
        })
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
      })
  };




  render() {

    var { gunData } = this.state;

   
    return (
  <div className="text-center">
     
    <Card className= 'card details-page'>
    <a href="/cds/inventory"><Button style={{backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px'}}>Back to Featured Products</Button></a>
   <img className="gun-img-detailspg" alt={`${gunData.itemdesc1}`}
    src={`https://cdsinventoryimages.s3.amazonaws.com/${gunData.image}`}
    onError={this.usePlaceholderImg}
    />
    <h3 style= {{padding: '15px'}} className="">{gunData.product_name}</h3>
     {/* <p className=" gun-desc">{gunData.product_description}</p> */}
     <h5 className="retail-price">{gunData.msrp_price}</h5>
     <h4>{gunData.sale_price}</h4>
     {/* <h4 className="">{gunData.quantity}</h4>
     <h4 className="">{gunData.caliber}</h4> */}
     <p className="gun-desc" style={{fontSize: '24px'}}>{gunData.product_description}</p>
    </Card>
    <BrowseTabber title="Search Again"/>
  </div>
    )
      }
    }
export default CdsDetails;


