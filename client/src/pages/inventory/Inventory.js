import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Spinner, Dropdown, DropdownButton } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
const queryString = require('query-string');


require("dotenv").config();

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gunData: [],
      isLoading: true,
      catData: [],
      keyParam: '',
      valParam: '',
      sort: "sort"
    };
    this.sortItem = this.sortItem.bind(this);
  }


  usePlaceholderImg(ev) {
    ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
    console.log(ev);
  }


  sortItem = (e, data) => {
    let sortVar = e.target.dataset.sort;
console.log(e.target.dataset.sort)
console.log("clicked")
this.setState({
  sort: sortVar
})

fetch(`/${this.state.keyParam}/${this.state.valParam}/${sortVar}`)
    .then(res => res.json())
    .then(json => {
      console.log("json", json)
      this.setState({
        gunData: json.data,
        isLoading: false
      })
  })
}

  componentDidMount() {
  let sort = "sort";
    console.log(this.props.match.params)
    // console.log(window.location.search)

    let keyParam = Object.keys(this.props.match.params);
    let valParam = Object.values(this.props.match.params);
    this.setState({
      keyParam: keyParam,
      valParam: valParam
    })

    fetch(`/${keyParam}/${valParam}/${this.state.sort}`)
      .then(res => res.json())
      .then(json => {
        console.log("json", json)
        this.setState({
          gunData: json.data,
          isLoading: false
        })
        console.log(this.state.gunData);
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
        console.log(this.state)
      });

  };

  render() {

    const profitMargin = 1.15;
    // var equation= gunData.dealer_price * profitMargin;
    // var price= Math.floor(equation * 100) / 100
    var { param, isLoading } = this.state;

    // console.log({this.state.gunData.image1})
    const items = this.state.gunData.map((item, i) =>
      <Card key={i} className='inventory-card'>
        <a href={`/api/model/${item.item_no}`}>
          {
            item.image1 ? (
              <img className="gun-img" alt={`${item.itemdesc1}`}
                // TODO: come up with better way to get images than this solution
                src={`https://www.davidsonsinc.com/ProdImageSm/${item.image1}`}
                onError={this.usePlaceholderImg}
              />
            ) : (

                <img className="gun-img" alt={`${item.itemdesc1}`}
                  // TODO: come up with better way to get images than this solution
                  src={`https://www.davidsonsinc.com/ProdImageSm/${item.item_no}.jpg`}
                  onError={this.usePlaceholderImg}
                />
              )
          }
          <p className="text-center">{item.item_description}</p>
          <p className="text-center">{item.model_series}</p>
          <h5 className="retail-price text-center">${item.retail_price}</h5>
          {item.retailmap > 0 ? (
            <h4 className="text-center">${item.retailmap}</h4>
          ) : (
              <h4 className="text-center">${(item.dealer_price * profitMargin).toFixed(2)}</h4>
            )
          }
          {item.total_quantity > 0 ? (
            <h5 className="text-center">{item.total_quantity} Left</h5>
          ) : (
              <h5 className="text-center">Out of Stock</h5>
            )}

        </a>
      </Card>
    );

    if (isLoading) {
      return (
        <div className="spinner-box">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>)
    }

    else {
      return (<div className="deck-wrapper">
        <DropdownButton size="lg" variant="dark" className="tc mt-2" id="dropdown-basic-button" title="Sort Price">
            <Dropdown.Item data-sort="priceUp" onClick={this.sortItem}>Low to High</Dropdown.Item>
            <Dropdown.Item data-sort="priceUpInStock" onClick={this.sortItem}>Low to High | Only In Stock</Dropdown.Item>
            <Dropdown.Item data-sort="priceDown" onClick={this.sortItem}>High to Low</Dropdown.Item>
            <Dropdown.Item data-sort="priceDownInStock" onClick={this.sortItem}>High to Low | Only In Stock</Dropdown.Item>
          </DropdownButton>
          {/* OPTIONAL */}
          {/* <div className="tc mt-2 dropdown">
            <Button data-sort="onlyInStock" onClick={this.sortItem} sz="lg" variant="dark" className="tc mt-2" id="dropdown-basic-button" title="Dropdown button">
      Show Only In Stock
          </Button></div> */}
        
        {/* TODO: make dynamic for others besides manufacturer */}
        <a><Button variant="dark" style={{ backgroundColor: '#dd6717' }} className="transf-back-btn">Back</Button></a>

        <CardDeck>
          {items}
        </CardDeck>
      </div>
      )
    }

  }
}
export default Inventory;


