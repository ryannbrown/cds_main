import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Alert, Row, Col } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
import SearchTool from "../../components/searchTool/index"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'

// const queryString = require('query-string');


require("dotenv").config();

class zandersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gunData: [],
            isLoading: true,
            errorPage: false,
            saveImage: false,
            catData: [],
            gunSpecs: [],
            param: '',
            descriptionKeys: [],
            descriptionValues: [],
            user: this.props.user,
            userLoaded: false,
            loginAlert: false,
            updated: false
        };
    }

    usePlaceholderImg(ev) {
        ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
        console.log(ev);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {

        var { gunData, saveImage, loginAlert, saveItem } = this.props;
        const profitMargin = 1.15
        var price = (gunData.price1 * profitMargin).toFixed(2);


        return (
            <div className="details-bg">



                <div className="details-page">

                    <Row>
                        <Col>
                            <a className="back-link" href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                            <h1 className="pt4">{gunData.desc1}</h1>
                            <h2 style={{ marginBottom: '0px' }}>{gunData.desc2}</h2>
                        </Col>
                    </Row>
                    {/* <Card className="text-center details-page"> */}

                    <Row>
                        <Col className="img-container" sm={12} md={8} >
                            {saveImage ? (
                                        <FontAwesomeIcon icon={faCheck}
                                            //  onClick={this.saveItem} TODO: NEED TO BE ABLE TO DELETE
                                            className="w-25"></FontAwesomeIcon>

                                    ) : (
                                            <FontAwesomeIcon icon={faHeart} onClick={saveItem} className="w-25"></FontAwesomeIcon>
                                        )}
                                    {loginAlert ? (
                                        <Alert variant="warning">
                            {/* Please login to save items to your profile */}
                            Feature Coming Soon!
                                        </Alert>
                                    ) : (
                                            <div></div>
                                        )}


                            <img className="gun-img" alt={`${gunData.desc1}`}
                                // TODO: come up with better way to get images than this solution
                                src={`${gunData.imagelink}`}
                                onError={this.usePlaceholderImg}
                            />

                        </Col>


                        <Col className="price-box" sm={12} md={4}>

                            <h2 className="retail-price">${gunData.msrp}</h2>
                            <h1>${price}</h1>
                            <h1>{gunData.model}</h1>
                            <h2>{gunData.manufacturer}</h2>
                            <h3>{gunData.caliber}</h3>
                            <h4>{gunData.qty1} In Stock</h4>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 className="pa4" style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData.itemnumber}</h2>
                            <p><i>"Add to Cart" Coming Soon</i></p>
                        </Col>
                    </Row>

                    <BrowseTabber title="Revise Search" />


                </div>
            </div>
        )
    }
}

export default zandersDetails;


