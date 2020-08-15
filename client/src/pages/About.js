import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Bio from "../components/bio/bio"
import MobileBoxes from "../components/boxes/boxes"
import insta from "../media/instagram.png"
import fbLogo from "../media/fb.jpg"
require("dotenv").config();

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
     state: "hello I am Home's state",
    };
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;

    document.body.appendChild(script);
  }



  render() {
    return (
      <Fragment>
      <div className="homepage-narrow about">
        <Bio></Bio>
        <div className="box-container">
          {/* <Container>
<Row> */}
          <Col><a href="tel:9193571884"><MobileBoxes text="Call" id="main2" /></a></Col>

          <Col><a href="mailto: info@colemandefense.com"><MobileBoxes link="/service" text="Email" id="main3" /></a></Col>

        </div>
        {/* <!-- LightWidget WIDGET --><script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script><iframe src="https://cdn.lightwidget.com/widgets/f8dfc718a9bc5fdf95d69fb036b22d21.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"></iframe> */}

        <iframe src="https://cdn.lightwidget.com/widgets/f8dfc718a9bc5fdf95d69fb036b22d21.html" scrolling="no" allowtransparency="true" onload="resizeIframe(this)" className="lightwidget-widget" style={{ width: `100%`, height: '100%' }}></iframe>
        <Container>

          <Row>
            <Col><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/colemandefense/"><img className="pulse" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"></img></a></Col>

            <Col><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/colemandefense/">

              <img className="pulse" src={fbLogo}></img></a></Col>
          </Row>

        </Container>

      </div>

    </Fragment>
    )
} }
    

export default About;
