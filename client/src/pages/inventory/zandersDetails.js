import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Alert, Row, Col, Carousel } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
import SearchTool from "../../components/searchTool/index"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from "react-helmet";
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
            imgData: [],
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


        var item_no = this.props.gunData.itemnumber;

        fetch(`/zanders/model/${item_no}`)
            .then(res => res.json())
            .then(json => {
                console.log("json", json)
                console.log("inventory", json.data[0])
                console.log("imgdata", json.data)
                this.setState({
                    imgData: json.data,
                })
                // var size = Object.keys(this.state.gunData).length;
                // console.log(size);
            })
    }

    componentDidUpdate() {

    }

    render() {
        var { gunData, saveImage, loginAlert, saveItem } = this.props;



        const seoTitle = gunData.manufacturer + ' | ' + gunData.desc1;
        console.log(seoTitle);
        const seoDescription = 'Buy a ' + gunData.desc1 + ' from Coleman Defense Solutions, based out of Durham, NC'




        const images = this.state.imgData.map((item, i) => {
            return (
                <Carousel.Item key={i}>
                    <img className="gun-img" alt={item.desc1}
                        // TODO: come up with better way to get images than this solution
                        src={item.imagelink}
                        onError={this.usePlaceholderImg}
                    />
                </Carousel.Item>
            )
        })

        const profitMargin = 1.15
        var price = (gunData.price1 * profitMargin).toFixed(2);


        return (
            <div className="details-bg">

                <Helmet>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} charSet="utf-8" />
                    {/* <link rel="canonical" href="http://www.colemandefense.com/" /> */}
                </Helmet>
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


                            {this.state.imgData.length > 0 ? (
                                <Carousel>
                                    {images}
                                </Carousel>
                            ) : (
                                    <img className="gun-img" alt={gunData.desc1}
                                        // TODO: come up with better way to get images than this solution
                                        src={gunData.imagelink}
                                        onError={this.usePlaceholderImg}
                                    />
                                )}

                        </Col>


                        <Col className="price-box" sm={12} md={4}>

                            <h2 className="retail-price">${gunData.msrp}</h2>
                            <h1>${price}</h1>
                            <h1>{gunData.model}</h1>
                            <h2>{gunData.manufacturer}</h2>
                            <h3>{gunData.caliber}</h3>
                            {gunData.available > 0 ? (
                                <h5 className="text-center">{gunData.available} Left</h5>
                            ) : (
                                    <h5 className="text-center">Out of Stock</h5>
                                )}

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


