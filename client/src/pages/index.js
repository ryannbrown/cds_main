import React, { Fragment, Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
// import { Styled } from "theme-ui"
import Header from "../components/header/header"
import MobileBoxes from "../components/boxes/boxes"
// import DesktopBoxes from "../components/boxes/desktopboxes"
import Bio from "../components/bio/bio"
import Letter from "../components/letter/letter"
import Navbar from "../components/Navbar"
import '../App.css'
import fbLogo from '../media/fb.jpg'
import insta from '../media/instagram.png'

// import { Link } from "gatsby"
/**
 * Change the content to add your own bio
 */

class Home extends Component {

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {

    return (
      <Fragment>
        
        <Header><Letter /></Header>
        <Bio></Bio>
        <div class="box-container">
          {/* <Container>
  <Row> */}
          <Col><a href="tel:9193571884"><MobileBoxes text="Call" id="main2" /></a></Col>

          <Col><a href="mailto: info@colemandefense.com"><MobileBoxes link="/service" text="Email" id="main3" /></a></Col>

        </div>

        <iframe src="//lightwidget.com/widgets/f8dfc718a9bc5fdf95d69fb036b22d21.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style={{ width: `100%` }}></iframe>
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
export default Home


