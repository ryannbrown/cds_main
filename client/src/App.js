import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import logo from "./logo.svg";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PaginationComponent from "./components/Pagination"
import "./App.css";
import Nav from "./components/Navbar";
// import SingleProduct from "./components/SingleProduct";
// import ProductList from "./components/ProductList";
// import { resolveNaptr } from "dns";
// import xml2js from 'xml2js';
// import axios from "axios";
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Inventory from './pages/inventory/Inventory';
import Browse from './pages/inventory/Browse';
import Details from './pages/inventory/Details';
import AdminPage from './pages/admin/admin';
import CdsInventory from "./pages/inventory/CdsInventory";
import CdsDetails from "./pages/inventory/CdsDetails";
import Transfers from "./pages/Transfers.js"
import { createBrowserHistory } from 'history'
// import transfers from "./pages/transfers.js ";
import ReactGA from 'react-ga'

// Google analytics
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO)
const browserHistory = createBrowserHistory()
browserHistory.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search)
})

export default function App() {


  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])



  return (
    <Router>
      <div>
        <Nav></Nav>
        

        <Switch>
          <Route exact path="/" component={() =>
            <Home
            />} />

          <Route path="/browse/:criteria" component={Browse} />

          <Route path="/gun_type/:gun_type" component={Inventory} />
          <Route path="/manufacturer/:manufacturer" component={Inventory} />
          <Route path="/caliber/:caliber" component={Inventory} />

          <Route path="/api/model/:item_no" component={Details} />

          <Route path="/admin" component={AdminPage} />

          <Route path="/api/post" component={AdminPage} />

          <Route path="/cds/inventory" component={CdsInventory} />
          <Route path="/cds/details/:id" component={CdsDetails} />

          <Route path="/cds/transfers" component={Transfers} />
          <Route path="/cds/about" component={About} />
          {/* <Route path="/cds/transfers" component={transfers}/> */}


        </Switch>
   
</div>
<footer id="footer">Copyright© 2020| Coleman Defense Solutions | Durham, NC | </footer>
    </Router>

  );


  // function Child() {
  //   let { brand_name } = useParams();
  // }

}

