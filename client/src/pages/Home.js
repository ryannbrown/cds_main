import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, Fragment } from "react";

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
import image from "../media/field22.jpg"
import "./Home.css"
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
require("dotenv").config();


export default class Home extends Component {
  constructor(props) {
    super(props)
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
          <div className="hero-pic">
            <h1 className="heroTitle">Coleman Defense Solutions</h1>
          <h2 className="heroSub">Quality Firearms</h2>
         <FontAwesomeIcon className="heroArrow" icon={faArrowDown}/>
          </div>
        <div className="homepage-container">
          <BrowseTabber/>





          <iframe  className="mt-4" src="//lightwidget.com/widgets/f8dfc718a9bc5fdf95d69fb036b22d21.html" scrolling="no" allowtransparency="true" onload="resizeIframe(this)" className="lightwidget-widget" style={{ width: `100%`, height: '100%' }}></iframe>
          <Container>

            <Row>
              <Col><a target="_blank" href="https://www.instagram.com/colemandefense/"><img className="pulse" src={insta}></img></a></Col>

              <Col><a target="_blank" href="https://www.facebook.com/colemandefense/">

                <img className="pulse" src={fbLogo}></img></a></Col>
            </Row>

          </Container>

        </div>

      </Fragment>
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
