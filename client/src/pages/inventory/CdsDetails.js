import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner } from 'react-bootstrap';
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
      isLoading: true,
    };
  }


  componentDidMount() {

    console.log(this.props.match.params)

    let param = Object.values(this.props.match.params);
    console.log(param)
    this.setState({
      param: param
    })

    fetch(`/api/details/${param}`)
      .then(res => res.json())
      .then(json => {
        console.log("inventory", json.data[0])
        this.setState({
          gunData: json.data[0],
          isLoading: false,
        })
        var size = Object.keys(this.state.gunData).length;
        console.log(size);
      })
  };




  render() {

    var { gunData, isLoading } = this.state;

    console.log(gunData.location)


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
        <div className="text-center details">
          <Card className='card details-page'>
            {/* back button logic */}
            {gunData.location == 'featured' ? (
              <a href="/cds/inventory/featured"><Button style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Back to Featured Products</Button></a>
            ) : gunData.location == 'aeroprecision' ? (
              <a href="/aeroprecision"><Button style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Back to Aero Precision</Button></a>
            ) : (<a href="/lmt"><Button style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }} variant="dark">Back to Lewis Machine & Tool</Button></a>)
            }

            <img className="gun-img-detailspg" alt={`${gunData.itemdesc1}`}
              src={`https://cdsinventoryimages.s3.amazonaws.com/${gunData.image}`}
              onError={this.usePlaceholderImg}
            />
            <h3 style={{ padding: '15px' }} className="">{gunData.product_name}</h3>
            {/* <p className=" gun-desc">{gunData.product_description}</p> */}
            <h5 className="retail-price">{gunData.msrp_price}</h5>
            <h4>{gunData.sale_price}</h4>

            {gunData.manufacturer || gunData.model || gunData.type || gunData.caliber || gunData.capacity || gunData.sights || gunData.barrellength || gunData.finish ? (
              <Accordion>
                <Card>
                  <Accordion.Toggle className="additionalinfo-btn" as={Button} variant="button" eventKey="0" onClick={this.scrollPage}>
                    <a>Click for Additional information</a>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="description-list">
                      <ListGroup variant="flush" style={{ width: '50%', margin: '0px auto' }}>
                        {
                          gunData.manufacturer ? (
                            <ListGroupItem>manufacturer: {gunData.manufacturer}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.model ? (
                            <ListGroupItem>Model: {gunData.model}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.type ? (
                            <ListGroupItem>Type: {gunData.type}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.caliber ? (
                            <ListGroupItem>Caliber: {gunData.caliber}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.capacity ? (
                            <ListGroupItem>Capacity: {gunData.capacity}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.finish ? (
                            <ListGroupItem>Finish: {gunData.finish}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.sights ? (
                            <ListGroupItem>Sights: {gunData.sights}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.barrellength ? (
                            <ListGroupItem>Barrel Length: {gunData.barrellength}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                        {
                          gunData.upcnumber ? (
                            <ListGroupItem>UPC #: {gunData.upcnumber}</ListGroupItem>
                          ) : (
                              <div></div>
                            )
                        }
                      </ListGroup>
                      <a name="scrolltobottom"></a>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ) : (
                <div></div>
              )
            }
            {/* <h4 className="">{gunData.quantity}</h4>
     <h4 className="">{gunData.caliber}</h4> */}
            <p className="gun-desc" style={{ fontSize: '24px' }}>{gunData.product_description}</p>
          </Card>
          <BrowseTabber title="Search Additional Inventory" />
        </div>
      )
    }
  }
}
export default CdsDetails;


