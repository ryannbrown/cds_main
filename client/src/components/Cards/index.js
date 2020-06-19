import React from "react"
import {Col, Container, Row} from "react-bootstrap"
import './style.css'
// import { Link } from "gatsby"
/**
 * Change the content to add your own bio
 */


class Cards extends React.Component {
    constructor(props) {
        super(props)
    }


render() {
    const { name, id, link } = this.props;
    return (
        
        <div className="card-container mv4">
    <Container>
        <Row><Col><h1 className="card-title">We are an authorized dealer for the following brands</h1></Col></Row>
  <Row>
    <Col><a href="/aeroprecision"><div className="ap-img mt3"><h1 className="card-text">Aero Precision</h1></div></a></Col>
    <Col><a href="/lmt"><div className="lmt-img mt3"><h1 className="card-text">Lewis Machine & Tool</h1></div></a></Col>
  </Row>
       </Container>
    </div>
    )
}
}

export default Cards