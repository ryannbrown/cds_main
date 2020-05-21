import React, { Component, Fragment } from "react";

// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Home.css";


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Bio from "../components/bio/bio"
import MobileBoxes from "../components/boxes/boxes"
import insta from "../media/instagram.png"
import fbLogo from "../media/fb.jpg"
import "./Home.css"
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
        
        <Bio></Bio>
        <div class="box-container">
          {/* <Container>
  <Row> */}
          <Col><a href="tel:9193571884"><MobileBoxes text="Call" id="main2" /></a></Col>

          <Col><a href="mailto: info@colemandefense.com"><MobileBoxes link="/service" text="Email" id="main3" /></a></Col>

        </div>

        <iframe src="//lightwidget.com/widgets/f8dfc718a9bc5fdf95d69fb036b22d21.html" scrolling="no" allowtransparency="true" onload="resizeIframe(this)" class="lightwidget-widget" style={{ width: `100%`, height: '100%' }}></iframe>
        <Container>
          
          <Row>
            <Col><a target="_blank" href="https://www.instagram.com/colemandefense/"><img class="pulse" src={insta}></img></a></Col>
         
            <Col><a target="_blank" href="https://www.facebook.com/colemandefense/">
            
            <img class="pulse" src={fbLogo}></img></a></Col>
        </Row>
        
        </Container>


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
