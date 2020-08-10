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

class lipseysDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gunData: [],
            isLoading: true,
            errorPage: false,
            saveImage: false,
            catData: [],
            gunData: [],
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


        console.log("ON LIPSEYS DETAILS")

        console.log(this.props.gunData.itemnumber)

        var item_no = this.props.gunData.itemnumber;

        fetch(`/lipseys/model/${item_no}`)
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

        const seoTitle = gunData.manufacturer + ' | ' + gunData.description1;
        console.log(seoTitle);
        const seoDescription = 'Buy a ' + gunData.description1 + ' from Coleman Defense Solutions, based out of Durham, NC'


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
        var price = (gunData.price * profitMargin).toFixed(2);


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
                            <h1 className="pt4">{gunData.description1}</h1>
                            <h2 style={{ marginBottom: '0px' }}>{gunData.description2}</h2>
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
                                    <img className="gun-img" alt={gunData.description1}
                                        // TODO: come up with better way to get images than this solution
                                        src={`https://www.lipseyscloud.com/images/${gunData.imagename}`}
                                        onError={this.usePlaceholderImg}
                                    />
                                )}

                        </Col>


                        <Col className="price-box" sm={12} md={4}>

                            <h2 className="retail-price">${gunData.msrp}</h2>
                            <h1>${price}</h1>
                            <h1>{gunData.model}</h1>
                            <h2>{gunData.manufacturer}</h2>
                            <h3>{gunData.calibergauge}</h3>
                            {gunData.quantity > 0 ? (
                                <h5 className="text-center">{gunData.quantity} Left</h5>
                            ) : (
                                    <h5 className="text-center">Out of Stock</h5>
                                )}

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 className="pa4" style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData.itemno}</h2>
                            <p><i>"Add to Cart" Coming Soon</i></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <Card.Body className="description-list">
                                <Col>
                                    <ul className="desc-list">

                                        {gunData.action ? (
                                            <li className="list-item">{gunData.action}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.additionalfeature1 ? (
                                            <li className="list-item">{gunData.additionalfeature1}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.additionalfeature2 ? (
                                            <li className="list-item">{gunData.additionalfeature2}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.additionalfeature3 ? (
                                            <li className="list-item">{gunData.additionalfeature3}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.framematerial ? (
                                            <li className="list-item"> Frame Material: {gunData.framematerial}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.capacity ? (
                                            <li className="list-item">Capacity: {gunData.capacity}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.stock ? (
                                            <li className="list-item">Stock: {gunData.stock}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.chamber ? (
                                            <li className="list-item">Chamber: {gunData.stock}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.magtype ? (
                                            <li className="list-item">Mag Type: {gunData.magtype}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.barrellength ? (
                                            <li className="list-item">Barrel Length: {gunData.barrellength}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.overalllength ? (
                                            <li className="list-item">Overall Length: {gunData.overalllength}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.reticle ? (
                                            <li className="list-item">Reticle: {gunData.reticle}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.safety ? (
                                            <li className="list-item">Safety: {gunData.safety}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.sights ? (
                                            <li className="list-item">Sights:{gunData.sights}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.fflrequired ? (
                                            <li className="list-item" style={{ color: 'red' }}>FFL Required</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.triggerguard ? (
                                            <li className="list-item">Trigger Guard: {gunData.triggerguard}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.finish ? (
                                            <li className="list-item">Finish: {gunData.finish}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                        {gunData.finishclass ? (
                                            <li className="list-item">Class Finish: {gunData.finishclass}</li>
                                        ) : (
                                                <div></div>
                                            )
                                        }

                                    </ul>
                                </Col>
                                <a name="scrolltobottom"></a>
                            </Card.Body>

                        </Col>
                    </Row>

                    <BrowseTabber title="Revise Search" />


                </div>
            </div>
        )
    }
}

export default lipseysDetails;


