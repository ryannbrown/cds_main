import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner, Carousel } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "../Home";
// import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";

// const queryString = require('query-string');


require("dotenv").config();

class zandersDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gunData: [] || '',
            imgData: [],
            isLoading: true,
            catData: [],
            gunSpecs: [],
            param: '',
            descriptionKeys: [],
            descriptionValues: []
        };
    }


    usePlaceholderImg(ev) {
        ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
        console.log(ev);
    }


    // TODO: implement scrolling to bottom on click

    scrollPage = () => {

        setTimeout(function () { window.scrollTo(0, 300); }, 250);
    }

    componentDidMount() {

        console.log(this.props.match.params)

        let param = Object.values(this.props.match.params);
        console.log(param);
        this.setState({
            param: param
        })

        fetch(`/zanders/model/${param}`)
            .then(res => res.json())
            .then(json => {
                console.log("json", json)
                console.log("inventory", json.data[0])
                console.log("imgdata", json.data)
                this.setState({
                    imgData: json.data,
                    gunData: json.data[0],
                    isLoading: false,
                })
                // var size = Object.keys(this.state.gunData).length;
                // console.log(size);
            })
    };




    render() {

        const profitMargin = 1.15

        var { param, descriptionKeys, descriptionValues, gunData, gunSpecs, isLoading, imgData } = this.state;

        console.log("img data in render", imgData);

        const images = imgData.map((item, i) => {
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

        // var price = (gunData["Dealer Price"] * profitMargin).toFixed(2);


        // gunData.dealer_price = this.state.gunData.dealer_price * 1.25;

        // const dealerPrice = this.state.gunData.msp;
        // console.log(Number(dealerPrice));
        // gunDat.replace(/[$,]+/g,"");
        // var result = parseFloat(currency) + .05;


        if (isLoading) {
            return (
                <div className="spinner-box">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        else {
            return (
                <div className="details">
                    <Card className='details-page'>

                        {imgData.length > 1 ? (
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


                        <h3 className="text-center mt2">{gunData.manufacturer}</h3>
                        <h3 className="text-center">{gunData.desc1}</h3>
                        <h3 className="text-center">{gunData.desc2}</h3>
                        <h5 className="retail-price text-center">${gunData.msrp}</h5>
                        {gunData.mapprice > 0 ? (
                            <h4 className="text-center">${gunData.mapprice}</h4>
                        ) : (
                                <h4 className="text-center">Email for Price</h4>
                            )
                        }


                        {gunData.qty1 > 0 ? (
                            <h5 className="text-center">{gunData.available} Left</h5>
                        ) : (
                                <h5 className="text-center">Out of Stock</h5>
                            )}
                        {/* </a> */}
                    </Card>
                    {/* <BrowseTabber title="Revise Search"/> */}
                </div>
            )
        }
    }
}
export default zandersDetails;


