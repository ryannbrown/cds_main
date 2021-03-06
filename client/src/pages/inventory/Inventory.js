import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Spinner, Dropdown, DropdownButton} from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from '../../components/BrowseTabber/BrowseTabber'
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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
      sort: "sort",
      currentPage: 1,
      itemsPerPage: 25
    };
    this.sortItem = this.sortItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    // window.scrollTo(0, 0)
    // console.log("clicked")
    // console.log(event.target.id)
    event.target.classList += ' active';
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  usePlaceholderImg(ev) {
    ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
    // console.log(ev);
  }
  increment = () => {

    console.log(Number(this.state.currentPage++))
    this.setState({
      currentPage: Number(this.state.currentPage++)
    })
    // console.log(ev);
  }
  decrement = () => {

    console.log(Number(this.state.currentPage--))
      this.setState({
        currentPage: Number(this.state.currentPage--)
      })
   
    // console.log(ev);
  }


  sortItem = (e, data) => {
    let sortVar = e.target.dataset.sort;
// console.log(e.target.dataset.sort)
// console.log("clicked")
this.setState({
  sort: sortVar
})

fetch(`/${this.state.keyParam}/${this.state.valParam}/${sortVar}`)
    .then(res => res.json())
    .then(json => {
      // console.log("json", json)
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
        // console.log(this.state.gunData);
        var size = Object.keys(this.state.gunData).length;
        // console.log(size);
        // console.log(this.state)
      });

  };

  render() {


    const seoTitle = Object.values(this.props.match.params) + 's for sale in Durham, NC'

    const seoDescription = 'At Coleman Defense Solutions, we have a wide range of ' + Object.values(this.props.match.params) + 's for sale in Durham, NC'

    const profitMargin = 1.15;
    // var equation= gunData.dealer_price * profitMargin;
    // var price= Math.floor(equation * 100) / 100
    var { param, isLoading, currentPage, itemsPerPage, gunData} = this.state;
   
// TODO: scroll to top when they use the pagination feature
 // Logic for displaying current items


 const indexOfLastTodo = currentPage * itemsPerPage;
 const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
//  console.log(indexOfLastTodo)
 const currentItems = gunData.slice(indexOfFirstTodo, indexOfLastTodo);

     // Logic for displaying page numbers
     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(gunData.length / itemsPerPage); i++) {
       pageNumbers.push(i);
      //  console.log(pageNumbers)
     }

     const numOfPages = pageNumbers.length;
console.log(pageNumbers.length)
    const renderPageNumbers = pageNumbers.map(number => {
      return (
      <li
      className="pagination-item"
        key={number}
        id={number}
        onClick={this.handleClick}
      >
        {number}
      </li>)
    })

    const items = currentItems.map((item, i) => {
      return (
      <Card key={i} className='inventory-card'>
        <a href={`/inventory/${item.distributor}/model/${item["Item #"]}`}>
          {/* image logic */}
          {
            item.distributor == 'davidsons' ? 
            (

                <img className="gun-img" alt={`${item.itemdesc1}`}
              // TODO: come up with better way to get images than this solution
              src={`https://www.davidsonsinc.com/ProdImageSm/${item["Item #"]}.jpg`}
              onError={this.usePlaceholderImg}
            />

              //    <img className="gun-img" alt={`${item.itemdesc1}`}
          //    // TODO: come up with better way to get images than this solution
          //    src={`https://www.davidsonsinc.com/ProdImageSm/${item.image1}`}
          //    onError={this.usePlaceholderImg}
          //  />

             
            )

             : (
              <div></div>
             ) 
          //    <img className="gun-img" alt={`${item.itemdesc1}`}
          //    // TODO: come up with better way to get images than this solution
          //    src={`https://www.davidsonsinc.com/ProdImageSm/${item.image1}`}
          //    onError={this.usePlaceholderImg}
          //  />
    }

    {
      item.distributor == 'zanders' ? (
        <img className="gun-img" alt={`${item.itemdesc1}`}
                // TODO: come up with better way to get images than this solution
                src={`${item.imagelink}`}
                onError={this.usePlaceholderImg}
              />
      ) : (
        <div></div>
      )
    }
    {
      item.distributor == 'lipseys' ? (
        <img className="gun-img" alt={`${item["Item Description"]}`}
                // TODO: come up with better way to get images than this solution
                src={`https://www.lipseyscloud.com/images/${item.imagename}`}
                onError={this.usePlaceholderImg}
              />
      ) : (
        <div></div>
      )
    }
    {
      item.distributor == 'sports south' ? (
        <img className="gun-img" alt={`${item["Item Description"]}`}
                // TODO: come up with better way to get images than this solution
                src={`https://media.server.theshootingwarehouse.com/large/${item["Item #"]}.jpg`}
                onError={this.usePlaceholderImg}
              />
      ) : (
        <div></div>
      )
    }
          <p className="text-center">{item["Item Description"]}</p>
          <p className="text-center">{item["Model Series"]}</p>
          {item["Retail Price"] > 0 ? (
            <h5 className="retail-price text-center">${item["Retail Price"]}</h5>
          ) : (
              <div></div>
            )
          }
          
          {item.retailmap > 0 ? (
            <h4 className="text-center">${item.retailmap}</h4>
          ) : (
              <h4 className="text-center">${(item["Dealer Price"] * profitMargin).toFixed(2)}</h4>
            )
          }
          {item.total_quantity > 0 ? (
            <h5 className="text-center">{item.total_quantity} Left</h5>
          ) : (
              <h5 className="text-center">Out of Stock</h5>
            )}
        </a>
      </Card>
      )}
    );

    if (isLoading) {
      return (
        <div className="spinner-box">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>)
    }

    else if (pageNumbers.length < 1) {
        return (
          <div className="w-50 tc center error-page "><h1 className="mt6">We are sorry but we cannot find what you are looking for.</h1>
            <h1 className="mv5">Try to use the tool below</h1>
            <BrowseTabber></BrowseTabber>
          </div>
        )
      }
    

    else {
      return (
      <div className="inventory-div">
         <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} charSet="utf-8" />
          {/* <link rel="canonical" href="http://www.colemandefense.com/" /> */}
        </Helmet>
      <div className="deck-wrapper">
        <DropdownButton size="lg" variant="dark" className="tc mt-2" id="dropdown-basic-button" title="Sort">
        <Dropdown.Header>Price</Dropdown.Header>
            <Dropdown.Item data-sort="priceUp" onClick={this.sortItem}>Low to High</Dropdown.Item>
            <Dropdown.Item data-sort="priceUpInStock" onClick={this.sortItem}>Low to High | Hide out of Stock Items</Dropdown.Item>
            <Dropdown.Item data-sort="priceDown" onClick={this.sortItem}>High to Low</Dropdown.Item>
            <Dropdown.Item data-sort="priceDownInStock" onClick={this.sortItem}>High to Low | Hide Out Stock Items</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Other</Dropdown.Header>
            <Dropdown.Item data-sort="onlyInStock" onClick={this.sortItem}>Hide out of Stock Items</Dropdown.Item>
          </DropdownButton>
          <div className="arrow-div">
          {currentPage > 1 ? (
            <FontAwesomeIcon className="" icon={faArrowLeft} onClick={this.decrement} />
          ): (
            <div></div>
          )}
          {currentPage == numOfPages ? (
            <div></div>
          ): (
            <FontAwesomeIcon className="" icon={faArrowRight} onClick={this.increment} />
          )} 
          </div>
          <div className="tc mt3"><p>current page: {currentPage} / {numOfPages}</p></div>
          {/* OPTIONAL */}
          {/* <div className="tc mt-2 dropdown">
            <Button data-sort="onlyInStock" onClick={this.sortItem} sz="lg" variant="dark" className="tc mt-2" id="dropdown-basic-button" title="Dropdown button">
      Show Only In Stock
          </Button></div> */}
        
        {/* TODO: make dynamic for others besides manufacturer */}
        <a href="/"><Button variant="dark" style={{ backgroundColor: '#dd6717' }} className="transf-back-btn">Back</Button></a>

        <CardDeck>
          {items}
        </CardDeck>
        <div className="pagination-div">
        <div className="arrow-div">
          {currentPage > 1 ? (
            <FontAwesomeIcon className="" icon={faArrowLeft} onClick={this.decrement} />
          ): (
            <div></div>
          )}
          {currentPage == numOfPages ? (
            <div></div>
          ): (
            <FontAwesomeIcon className="" icon={faArrowRight} onClick={this.increment} />
          )} 
          </div>
        
          <div className="tc mt3"><p>current page: {currentPage} / {numOfPages}</p></div>
        <ul className="pagination-list" id="page-numbers">
              {renderPageNumbers}
            </ul>
            </div>
            <BrowseTabber title="Refine Your Search" />
      </div>
      </div>
      )
    }

  }
}
export default Inventory;


