import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, Fragment } from "react";
import { Nav } from "react-bootstrap"


// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Home.css";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Bio from "../components/bio/bio"
import MobileBoxes from "../components/boxes/boxes"
import insta from "../media/instagram.png"
import fbLogo from "../media/fb.jpg"
import Filter from "../components/Filter/Filter"
import BrowseTabber from "../components/BrowseTabber/BrowseTabber"
import Carousel from "../components/Carousel/Carousel"
import image from "../media/field22.jpg"
import "./Home.css"
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import ScrollIntoView from 'react-scroll-into-view'
require("dotenv").config();

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    //   if (this.$ref && window.location.href.includes('#my-ref')) {
    //     this.$ref.scrollIntoView({
    //         // optional params
    //         behaviour: 'smooth',
    //         block: 'start',
    //         inline: 'center',
    //     });
    // }

    const script = document.createElement("script");

    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="homepage">
        <a id="home"></a>
        <Nav style={{ display: 'none' }} variant="pills" defaultActiveKey="home" className="flex-column trippy-nav">
          <ScrollIntoView selector="#home"><Nav.Link eventKey="home">Home</Nav.Link></ScrollIntoView>
          <ScrollIntoView selector="#car"><Nav.Link eventKey="link-1">Featured</Nav.Link></ScrollIntoView>
          <ScrollIntoView selector="#tabber"><Nav.Link eventKey="link-2">Browse</Nav.Link></ScrollIntoView>
          <ScrollIntoView selector="#contact"><Nav.Link eventKey="link-3">
            Contact
  </Nav.Link></ScrollIntoView>
        </Nav>
        <div className="hero-pic">
          <h1 className="heroTitle">Coleman Defense Solutions</h1>
          <h2 className="heroSub">Quality Firearms</h2>
          <ScrollIntoView alignToTop selector="#car"><FontAwesomeIcon className="heroArrow" icon={faArrowDown} /></ScrollIntoView>
        </div>
        <div className="homepage-container">

          <a name="my-ref" id="car">
          </a>
          <div className="tab-car" style={{ marginBottom: '25%' }}>
            <Carousel /> 
          <ScrollIntoView selector="#tabber"><FontAwesomeIcon className="carArrow" icon={faArrowDown} />
          </ScrollIntoView></div>
          {/* <Carousel /> */}
          <a id="tabber"> </a>
          <div className="headliner">Explore 1000's of Items</div>
          <div className="tab-browse" style={{ marginBottom: '55%' }}><BrowseTabber />
            <ScrollIntoView selector="#contact"> <FontAwesomeIcon className="browseArrow" icon={faArrowDown} /></ScrollIntoView></div>
          <Container>

            <Row>
              <Col><a target="_blank" href="https://www.instagram.com/colemandefense/"><img className="pulse" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"></img></a></Col>

              <Col><a target="_blank" href="https://www.facebook.com/colemandefense/">

                <img className="pulse" src={fbLogo}></img></a></Col>
            </Row>
            <a id="contact"></a>
          </Container>

          <iframe className="mt-4" src="//lightwidget.com/widgets/f8dfc718a9bc5fdf95d69fb036b22d21.html" scrolling="no" allowtransparency="true" onload="resizeIframe(this)" className="lightwidget-widget" style={{ width: `100%`, height: '100%' }}></iframe>
        </div>

      </div>
    )
  }
}



// import Header from "../components/header/header"
// import MobileBoxes from "../components/boxes/boxes"
// import Bio from "../components/bio/bio"
// import Letter from "../components/letter/letter"
// import Navbar from "../components/Navbar"
// import '../App.css'
// import fbLogo from '../media/fb.jpg'
// import insta from '../media/instagram.png'
