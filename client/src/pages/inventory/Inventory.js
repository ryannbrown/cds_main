import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";



require("dotenv").config();

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gunData: [],
      isLoaded: false,
      catData: [],
      keyParam: '',
      valParam: ''
    };
  }


usePlaceholderImg(ev){
  ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
  console.log(ev);
}

  componentDidMount() {

   console.log(this.props.match.params)

   let keyParam = Object.keys(this.props.match.params);
   let valParam = Object.values(this.props.match.params);
   this.setState({
    keyParam: keyParam,
    valParam: valParam
  })

    fetch(`/${keyParam}/${valParam}`)
      .then(res => res.json())
      .then(json => {
        console.log("json", json)
        this.setState({
          gunData: json.data,
          isLoaded: true
        })
        console.log(this.state.gunData);
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
      });


   

  };



  render() {
    var { param } = this.state;
    // console.log({this.state.gunData.image1})
    const items = this.state.gunData.map((item, i) =>
    <Card key={i} className= 'inventory-card'>
      <a href={`/api/model/${item.item_no}`}>
   <img className="gun-img" alt={`${item.itemdesc1}`}
   // TODO: come up with better way to get images than this solution
    src={`https://www.davidsonsinc.com/ProdImageSm/${item.item_no}.jpg`}
    onError={this.usePlaceholderImg}
    />
     <p className="text-center">{item.item_description}</p>
     <p className="text-center">{item.model_series}</p>
     <h5 className="retail-price text-center">${item.retailprice}</h5>
     <h4 className="text-center">{item.dealer_price}</h4>
     { item.total_quantity ? (
       <h5 className="text-center">{item.total_quantity} Left</h5>
     ): (
      <h5 className="text-center">Out of Stock</h5>
     )}
    
     </a>
    </Card>
    );
    return (
      <div className="deck-wrapper">
        {/* TODO: make dynamic for others besides manufacturer */}
           <a href={`/`}><Button variant="outline-info">back</Button></a>
     
        <CardDeck>
        {items}
        </CardDeck>
      </div>

    );
  }
}
export default Inventory;


