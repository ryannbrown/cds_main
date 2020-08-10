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
import { Helmet } from "react-helmet";

// const queryString = require('query-string');


require("dotenv").config();

class davidsonsDetails extends Component {
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
        
        
        var { gunData, gunSpecs, saveImage, loginAlert, saveItem } = this.props;


        const seoTitle = gunData.manufacturer + ' | ' +  gunData["Item Description"];
        console.log(seoTitle);
        const seoDescription = 'Buy a ' + gunData["Item Description"] + ' from Coleman Defense Solutions, based out of Durham, NC'
        
        const profitMargin = 1.15
        var price = (gunData["Dealer Price"] * profitMargin).toFixed(2);


        return (
            <div className="details-bg">
                <Helmet>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} charSet="utf-8" />
                    {/* <link rel="canonical" href="http://www.colemandefense.com/" /> */}
                </Helmet>
                {gunSpecs ? (
                    <div className="details-page">

                        <Row>
                            <Col>
                                <a className="back-link" href={`/manufacturer/${this.props.gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                                <h1 className="pt4">{gunData["Item Description"]}</h1>
                                <p style={{ marginBottom: '0px' }}>{gunData.features}</p>
                                <p>Finish: {gunData.finish}</p>
                            </Col>
                        </Row>
                        {/* <Card className="text-center details-page"> */}

                        <Row>
                            <Col className="img-container" sm={12} md={8} >
                                {saveImage ? (
                                    <FontAwesomeIcon icon={faCheck}
                                        //  onClick={this.saveItem} TODO: NEED TO BE ABLE TO DELETE
                                        className="w-25 fa-icon"></FontAwesomeIcon>

                                ) : (
                                        <FontAwesomeIcon icon={faHeart} onClick={saveItem} className="w-25 fa-icon"></FontAwesomeIcon>
                                    )}
                                {loginAlert ? (
                                    <Alert variant="warning">
                                        {/* Please login to save items to your profile */}
                                    Feature Coming Soon!
                                    </Alert>
                                ) : (
                                        <div></div>
                                    )}
                                {
                                    gunSpecs.image1 ?
                                        (


                                            <img className="gun-img" alt={`${gunData.itemdesc1}`}
                                                // TODO: come up with better way to get images than this solution
                                                src={`https://www.davidsonsinc.com/Prod_images/${gunSpecs.image1}`}
                                                onError={this.usePlaceholderImg}
                                            />

                                        )

                                        : (

                                            <img className="gun-img" alt={`${gunData.itemdesc1}`}
                                                // TODO: come up with better way to get images than this solution
                                                src={`https://www.davidsonsinc.com/Prod_images/${gunData["Item #"]}.jpg`}
                                                onError={this.usePlaceholderImg}
                                            />


                                        )

                                }</Col>


                            <Col className="price-box" sm={12} md={4}>

                                <h2 className="retail-price">${gunData["Retail Price"]}</h2>
                                {gunSpecs.retailmap > 0 ? (
                                    <h1 className="text-center">${gunSpecs.retailmap}</h1>
                                ) : (
                                        <h1>${price}</h1>
                                        // <div></div>
                                    )
                                }
                                <h1>{gunData.model}</h1>
                                <h1>{gunData["Model Series"]}</h1>
                                <h2>{gunData["Gun Type"]}</h2>
                                <h2>{gunData.manufacturer}</h2>
                                <h3>{gunData.caliber}</h3>
                                <h3>{gunData["Gun Action"]}</h3>
                                {gunData.total_quantity > 0 ? (
                                    <h5 className="text-center">{gunData.total_quantity} Left</h5>
                                ) : (
                                        <h5 className="text-center">Out of Stock</h5>
                                    )}

                            </Col>
                        </Row>

                        <Row>
                            <Col>

                                <Card.Body className="description-list">
                                    <Col>
                                        <ul className="desc-list">

                                            {gunData.features1 ? (
                                                <li className="list-item">{gunSpecs.features1}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunData.features2 ? (
                                                <li className="list-item">{gunSpecs.features2}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunData.features3 ? (
                                                <li className="list-item">{gunSpecs.features3}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.framematerial ? (
                                                <li className="list-item"> Frame Material: {gunSpecs.framematerial}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.capacity ? (
                                                <li className="list-item">Capacity: {gunSpecs.capacity}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.stock ? (
                                                <li className="list-item">Stock: {gunSpecs.stock}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.magtype ? (
                                                <li className="list-item">Mag Type: {gunSpecs.magtype}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.overalllength ? (
                                                <li className="list-item">Overall Length: {gunSpecs.overalllength}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.sightfront ? (
                                                <li className="list-item">Sight Front: {gunSpecs.sightfront}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.sightrear ? (
                                                <li className="list-item">Sight Rear: {gunSpecs.sightrear}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.triggerguard ? (
                                                <li className="list-item">Trigger Guard: {gunSpecs.triggerguard}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.finishframe ? (
                                                <li className="list-item">Frame Finish: {gunSpecs.finishframe}</li>
                                            ) : (
                                                    <div></div>
                                                )
                                            }
                                            {gunSpecs.finishclass ? (
                                                <li className="list-item">Class Finish: {gunSpecs.finishclass}</li>
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
                        <Row>
                            <Col>
                                <h2 className="pa4" style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData["Item #"]}</h2>
                                <p><i>"Add to Cart" Coming Soon</i></p>
                            </Col>
                        </Row>

                        <BrowseTabber title="Revise Search" />
                    </div>
                ) : (


                        <div className="details-page">

                            <Row>
                                <Col>
                                    <a className="back-link" href={`/manufacturer/${gunData.manufacturer}`}><Button variant="dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Explore More From {gunData.manufacturer}</Button></a>
                                    <h1 className="pt4">{gunData["Item Description"]}</h1>
                                    <p style={{ marginBottom: '0px' }}>{gunData.features}</p>
                                    <p>Finish: {gunData.finish}</p>
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


                                    <img className="gun-img" alt={`${gunData.itemdesc1}`}
                                        // TODO: come up with better way to get images than this solution
                                        src={`https://www.davidsonsinc.com/Prod_images/${gunData["Item #"]}.jpg`}
                                        onError={this.usePlaceholderImg}
                                    />

                                </Col>


                                <Col className="price-box" sm={12} md={4}>

                                    <h2 className="retail-price">${gunData["Retail Price"]}</h2>
                                    {gunData.retailmap > 0 ? (
                                        <h1 className="text-center">${gunSpecs.retailmap}</h1>
                                    ) : (
                                            <h1>${price}</h1>
                                            // <div></div>
                                        )
                                    }
                                    <h1>{gunData.model}</h1>
                                    <h1>{gunData["Model Series"]}</h1>
                                    <h2>{gunData["Gun Type"]}</h2>
                                    <h2>{gunData.manufacturer}</h2>
                                    <h3>{gunData.caliber}</h3>
                                    <h3>{gunData["Gun Action"]}</h3>
                                    {gunData.total_quantity > 0 ? (
                                        <h5 className="text-center">{gunData.total_quantity} Left</h5>
                                    ) : (
                                            <h5 className="text-center">Out of Stock</h5>
                                        )}

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2 className="pa4" style={{ color: 'rgb(221, 103, 23)' }}>Order with Item # : {gunData["Item #"]}</h2>
                                    <p><i>"Add to Cart" Coming Soon</i></p>
                                </Col>
                            </Row>

                            <BrowseTabber title="Revise Search" />


                        </div>

                    )
                }
            </div>
        )
    }
}

export default davidsonsDetails;


