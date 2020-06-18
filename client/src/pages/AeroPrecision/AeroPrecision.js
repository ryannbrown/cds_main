import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
import CdsInventory from "../../components/cdsInventory/index"
// const queryString = require('query-string');


require("dotenv").config();

class AeroPrecision extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  componentDidMount() {


  };




  render() {

    return (
      <article className="helvetica pb5">
        <header className="vh-100 dt w-100">
          <div
            className="dtc v-mid cover ph3 ph4-m ph5-l custom-aero">
            <h1 className="f2 f-subheadline-l measure lh-title fw9">Coleman Defense is an authorized dealer for Aero Precision</h1>
            {/* <h2 className="f6 fw6 nearwhite">Quality Matters</h2> */}
          </div>
        </header>
        <div className="serif ph3 ph4-m ph5-l">
          <p className="lh-copy f5 f3-m f1-l measure center pv4">
            "Aero Precision started as an idea in our heads while working late nights in a machine shop at Alaska Airlines" -Scott Dover CEO | Founder  </p>
          <div className="f5 f3-m lh-copy">
            <div className="cf dt-l w-100 bt b--black-10 pv4">
              <div className="dtc-l v-mid mw6 pr3-l">
                <img className="w-100" src="https://i.ibb.co/Qnqpkyz/Complete-Rifles00147-compressor.jpg" alt="" />
              </div>
              <div className="dtc-l v-mid f6 f5-m f4-l measure-l tc">
                <p className="measure pv4-l center">
                  <span className="fw9 fw4-ns">
                    Over the past 25 years, Aero Precision has established a reputation for providing high quality American Made products that can be trusted in the most rigorous
                    of circumstances. Although our roots started in aerospace, it’s firearms where we ultimately found our passion in providing the industry with the best value
                    products possible. It’s hard to imagine what started as a couple machines in a garage would turn in to the Aero Precision you see today
</span>
                </p>
                {/* <a className="f6 link dim ba ph3 pv2 mb2 dib black" href="#0">Product Information Coming Soon</a> */}
              </div>
            </div>
            <div className="inventory-container">
              <CdsInventory selection='aeroprecision' />

            </div>
            {/* <div className="cf dn">
          <div className="fl w-100 w-50-l">
            <p className="f5 pv4">
              During high tides, water would flow directly into the pools from the
              nearby ocean, recycling the <span className="db f4 f3-m f1-l fw6 measure lh-title">two million US gallons of water in about an hour. </span>
            </p>
          </div>
          <div className="fl w-100 w-50-l">
            <p className="f5">
              During low tides, a powerful turbine water pump,
              built inside a cave at sea level, could be switched on from a control
              room and could fill the tanks at a rate of 6,000 US gallons a minute,
              recycling all the water in five hours.
            </p>
          </div>
        </div> */}
            <div className="cf">
              {/* <div className="fl w-100 w-50-l pr2-l pb3">
            <img className="db w-100" src="http://mrmrs.github.io/photos/010.jpg" alt="Photo of a dusk skyline above a grassy rockface covered in trees." />
          </div> */}
              <div className="fl w-50 w-50-l pr1 pr0-l pl2-l pb3">
                <img className="db w-100" src="https://i.ibb.co/FBhPssm/DSC-1494-min.jpg" alt="DSC-1494" />
              </div>
              <div className="fl w-50 w-50-l pl2 pl0-l pr2-l pb3">
                <img className="db w-100" src="https://i.ibb.co/qmM68MK/DSC-6668-compressor.jpg" alt="DSC-6668" />
              </div>
              {/* <div className="fl w-100 w-50-l pl2-l">
            <img className="db w-100" src="http://mrmrs.github.io/photos/013.jpg" alt="Photo of the foundations of a building on a cliff overlooking a lighthouse." />
          </div> */}
            </div>
          </div>
        </div>
      </article>
    )
  }
}
export default AeroPrecision;


