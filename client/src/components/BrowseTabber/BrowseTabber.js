import React, { Component } from "react";
import "../../pages/Home"
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Form, Tab, Tabs } from 'react-bootstrap';
import './style.css'
import Filter from '../Filter/Filter'
// const queryString = require('query-string');

require("dotenv").config();

class BrowseTabber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            catData: []
        };
    }

    render() {
console.log(this.props.title);

        return (

            <div className="browseTabber">
                <h1 className="text-center mt-4">{this.props.title}</h1>
                <Tabs style={{ marginTop: '10px' }} defaultActiveKey="featured" id="uncontrolled-tab-example">
                    <Tab eventKey="featured" title="Featured">
                        <a href="/cd/details"><div className="text-center mt-2"><button type="button" className=" mt-3 btn btn-dark" style={{ backgroundColor: 'rgb(221, 103, 23)', fontSize: '24px' }}>Browse Featured</button></div></a>
                    </Tab>
                    <Tab eventKey="home" title="Manufacturer">
                        <Filter param="manufacturer" link="/browse/manufacturer" />
                    </Tab>
                    <Tab eventKey="profile" title="Gun Type">
                        <Filter param="gun_type" link="/browse/Gun%20Type" />
                    </Tab>
                    <Tab eventKey="contact" title="Caliber">
                        <Filter param="caliber" link="/browse/caliber" />
                    </Tab>
                </Tabs>
            </div>

        )
    }
}

export default BrowseTabber