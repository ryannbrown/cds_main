import React, { Component, } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Table, Accordion, Spinner } from 'react-bootstrap';
import './style.css'
// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../Home";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";

// const queryString = require('query-string');


require("dotenv").config();

class LMT extends Component {
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
        className="dtc v-mid cover ph3 ph4-m ph5-l custom-lmt">
        <h1 className="f2 f-subheadline-l measure lh-title fw9">Coleman Defense is an authorized dealer for Lewis Machine & Tool</h1>
        {/* <h2 className="f6 fw6 nearwhite">Quality Matters</h2> */}
      </div>
    </header>
    <div className="serif ph3 ph4-m ph5-l">
      <p className="lh-copy f5 f3-m f1-l measure center pv4">    
      LMT was founded in 1980 to provide the US military, law enforcement and government agencies with high quality weapons, components, and modular weapon systems.  </p>
      <div className="f5 f3-m lh-copy">
        <div className="cf dt-l w-100 bt b--black-10 pv4">
          <div className="dtc-l v-mid mw6 pr3-l">
            <img className="w-100" src="https://lmtdefense.com/media/2019/05/REFT_AZ_DAY5_P2_PRINT_0189-e1588100010731.jpg" alt="" />
          </div>
          <div className="dtc-l v-mid f6 f5-m f4-l measure-l tc">
            <p className="measure pv4-l center">
              <span className="fw9 fw4-ns">
              LMT continues to serve the US military, law enforcement and government agencies, and has expanded to include foreign military services as well as commercial retailers. LMTs engineers design and fabricate complete weapon systems, grenade launchers, and Monolithic Rail Platform (MRP®) systems specifically for the demanding environments that the military and law enforcement face on a day-to-day basis whether in urban environments or in desert combat situations. LMT produces a full line of accessories and components for the commercial market complementing any M16 or AR15 type weapon.
</span>
            </p>
            <a className="f6 link dim ba ph3 pv2 mb2 dib black" target="_blank" href="https://lmtdefense.com/cms/wp-content/uploads/2020/04/2020-Catalog-Digital.pdf">Click Here for Product Brochure</a>
          </div>
        </div>
        <div className="cf dn">
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
        </div>
        <div className="cf">
          {/* <div className="fl w-100 w-50-l pr2-l pb3">
            <img className="db w-100" src="http://mrmrs.github.io/photos/010.jpg" alt="Photo of a dusk skyline above a grassy rockface covered in trees." />
          </div> */}
          <div className="fl w-50 w-50-l pl2 pl0-l pr2-l pb3">
            <img className="db w-100" src="https://lmtdefense.com/cms/wp-content/themes/lmtdefense-2019/style/img/family-bg-mrp.jpg" alt="DSC-6668" />
          </div>
          <div className="fl w-50 w-50-l pr1 pr0-l pl2-l pb3">
            <img className="db w-100" src="https://lmtdefense.com/cms/wp-content/themes/lmtdefense-2019/style/img/family-bg-spm.jpg" alt="DSC-1494" />
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
export default LMT;


