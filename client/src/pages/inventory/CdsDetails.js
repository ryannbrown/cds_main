import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Row, Col } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../Home";
import BrowseTabber from '../../components/BrowseTabber/BrowseTabber'
import { Helmet } from "react-helmet";
import LoginModal from "../../components/loginModal/index"
import { ThemeContextConsumer } from "../../utils/themeContext";


// const queryString = require('query-string');


require("dotenv").config();

class CdsDetails extends Component {
    static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      gunData: [] || '',
      isLoading: true,
      show: false,
      setShow: false,
      addedToCart: false
    };
  }


  
  handleClose = () => {
    console.log("handling close")
    this.setState({
      show: false,
      setShow: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
      setShow: true,
    });
  };

  addToCart = () => {
    let ourContext = this.context;
    // console.log('adding to cart', this.state.gunData.uuid)

    ourContext.addToCart(this.state.gunData.uuid, this.state.gunData.product_name, this.state.gunData.sale_price)
    this.setState({
      addedToCart: true
    })
  }


  componentDidMount() {
    let ourContext = this.context;
    // console.log(ourContext)

    // console.log(this.props.match.params)

    let param = Object.values(this.props.match.params);
    // console.log(param)
    this.setState({
      param: param
    })

    fetch(`/api/details/${param}`)
      .then(res => res.json())
      .then(json => {
        // console.log("inventory", json.data[0])
        this.setState({
          gunData: json.data[0],
          isLoading: false,
        })
        var size = Object.keys(this.state.gunData).length;
        // console.log(size);
      })
  };




  render() {

    var { gunData, isLoading, show } = this.state;


    const seoTitle = gunData.product_name;
    // console.log(seoTitle);
    const seoDescription = 'Buy a ' + gunData.product_name + ' from Coleman Defense Solutions, based out of Durham, NC'
    

    // console.log(gunData.location)


    if (isLoading) {
      return (
        <div className="spinner-box">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    }

    else {
      return (
        <ThemeContextConsumer>
        {(context) => (
        <div className="details-bg">
          <Helmet>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} charSet="utf-8" />
                    {/* <link rel="canonical" href="http://www.colemandefense.com/" /> */}
                </Helmet>
          <div className='details-page'>

            <Row>
              <Col>
                {/* back button logic */}
                {gunData.location == 'featured' || gunData.location == 'current' ? (
                  <Link to="/cds/inventory/current"><Button style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Back to Current Inventory</Button></Link>
                ) : gunData.location == 'aeroprecision' ? (
                  <Link to="/aeroprecision"><Button style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Back to Aero Precision</Button></Link>
                ) : (<Link to="/lmt"><Button style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Back to Lewis Machine & Tool</Button></Link>)
                }

              </Col>
            </Row>

            <Row>
              <Col className="img-container" sm={12} md={8} >
                <img className="gun-img-detailspg" alt={`${gunData.itemdesc1}`}
                  src={`https://cdsinventoryimages.s3.amazonaws.com/${gunData.image}`}
                  onError={this.usePlaceholderImg}
                />
              </Col>
              <Col className="price-box" sm={12} md={4}>
                <h1 style={{ padding: '15px' }} className="">{gunData.product_name}</h1>
                <h2 className="retail-price">{gunData.msrp_price}</h2>
                <h1>{gunData.sale_price}</h1>
                {gunData.quantity > 0 ? <div>
                  <h4>{gunData.quantity} In Stock</h4> <Button onClick={context.userLoggedIn ? this.addToCart : this.handleShow} style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Add to cart</Button>
                </div>
               :<div>Sold Out</div>
              
                
              }
                {this.state.addedToCart && <p>Item Added!</p>}
              </Col>
            </Row>

            <Row>
              <Col>
                <Card.Body className="description-list">
                  <ul className="desc-list">
                    {
                      gunData.manufacturer ? (
                        <li className="list-item">manufacturer: {gunData.manufacturer}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.model ? (
                        <li className="list-item">Model: {gunData.model}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.type ? (
                        <li className="list-item">Type: {gunData.type}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.caliber ? (
                        <li className="list-item">Caliber: {gunData.caliber}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.capacity ? (
                        <li className="list-item">Capacity: {gunData.capacity}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.finish ? (
                        <li className="list-item">Finish: {gunData.finish}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.sights ? (
                        <li className="list-item">Sights: {gunData.sights}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.barrellength ? (
                        <li className="list-item">Barrel Length: {gunData.barrellength}</li>
                      ) : (
                          <div></div>
                        )
                    }
                    {
                      gunData.upcnumber ? (
                        <li className="list-item">UPC #: {gunData.upcnumber}</li>
                      ) : (
                          <div></div>
                        )
                    }
                  </ul>

                </Card.Body>
              </Col>
            </Row>
            <p className="gun-desc" style={{ fontSize: '24px' }}>{gunData.product_description}</p>
            <LoginModal action={this.props.action} show={show} onHide={this.handleClose} handleShow={this.handleShow} handleClose={this.handleClose} ></LoginModal>
            <BrowseTabber title="Search Additional Inventory" />
          </div>


          {/* <LoginModal action={this.props.action} show={show} onHide={this.handleClose} handleShow={this.handleShow} handleClose={this.handleClose} ></LoginModal> */}
        </div>
          )}
          </ThemeContextConsumer>
      )
    }
  }
}
export default CdsDetails;


