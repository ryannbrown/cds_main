import React, { Component, Fragment } from "react";
// import "../Home";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Container, Row, Col } from 'react-bootstrap';
import { Helmet } from "react-helmet";
// const queryString = require('query-string');

require("dotenv").config();

class Transfers extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div>
        <Helmet>
          <title>Gun Transfers</title>
          <meta name="description" content="Coleman Defense Solutions offers transfer services- based out of Durham, NC" charSet="utf-8" />
          <link rel="canonical" href="http://www.colemandefense.com/" />
        </Helmet>
        <a href="/">
          <Button variant="dark" style={{ backgroundColor: '#dd6717' }} className="transf-back-btn mt-3">Back</Button>

        </a>
        <Container>

          <Row>
            <Col className="transf-col">
              <div>

                <h1 className="text-center mt-5">Firearm Transfer Services</h1>
                <div className="bio-text-transfer text-center">


                  <p style={{ color: '#dd6717' }}> I am currently <bold>not</bold> offering transfer services. Sorry for any inconvenience.</p>

                  {/* <p>I offer transfer services for all types of firearms and NFA items.</p>

                  <p style={{ color: '#dd6717' }}>*Pickup by appointment only.</p>

                  <p>Pricing:</p>

                  <p>Long Guns & Handguns:</p>
                  <p>$20 per transfer (up to 3 firearms)</p>

                  <p>Class 3/NFA Transfers:</p>
                  <p>$65 per transfer</p>
                  <p>Firearms shipped from non FFL holders are accepted. All private sale shipments must include a copy of the shippers drivers license or the firearm will not be logged in and transfered to the receiver</p>
                  <p>Shipping to another FFL will include shipping charges plus above fees</p>
                  <p>Send a copy of your transfering FFL to:
      <a style={{ color: 'blue' }} href="mailto: ffl@colemandefense.com"> FFL@colemandefense.com</a></p>
                  <p>Use the
      <a style={{ color: 'blue' }} target="_blank" rel="noopener noreferrer" href="https://fflezcheck.atf.gov/fflezcheck/"> ATF EZ Check</a> to verify my license:</p>
                  <p className="ba b--dotted bw2">1-56-XXX-XX-XX-13252</p>
                  <p>Payment can be made at time of transfer with cash, check, or credit card.</p> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Transfers;
