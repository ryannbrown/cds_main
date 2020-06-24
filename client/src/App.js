import React, { Component, useEffect, Redirect, useState } from "react";
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
import Profile from '../src/pages/profile';
import Inventory from './pages/inventory/Inventory';
import Browse from './pages/inventory/Browse';
import Details from './pages/inventory/Details';
import AdminPage from './pages/admin/admin';
import loginModal from '../src/components/loginModal/index.js';
import Registration from '../src/pages/registration/index.js';
import CdsInventory from "./pages/inventory/CdsInventory";
import CdsDetails from "./pages/inventory/CdsDetails";
import Transfers from "./pages/Transfers.js"
import AeroPrecision from "./pages/AeroPrecision/AeroPrecision.js"
import zandersInventory from "./pages/inventory/zanders/zandersInventory.js"
import zandersDetails from "./pages/inventory/zanders/zandersDetails.js"
import LMT from "./pages/AeroPrecision/LMT.js"
import { createBrowserHistory } from 'history'
// import transfers from "./pages/transfers.js ";
import ReactGA from 'react-ga'

// Google analytics
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO)
const browserHistory = createBrowserHistory()
browserHistory.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search)
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
    this.handler = this.handler.bind(this);
  }

  handler(user) {
    console.log("handler has actually handled!")
    this.setState({
      loggedIn: true,
      user: user
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    console.log(this.state)


    return (
      <Router>
        <div>
          <Nav action={this.handler} loggedIn={this.state.loggedIn} user={this.state.user}>
            {/* <loginModal></loginModal> */}
          </Nav>


          <Switch>
            <Route exact path="/" component={() =>
              <Home
              />} />
            <Route path="/cds/registration" component={Registration} />
            <Route path="/browse/:criteria" component={Browse} />

            <Route path="/gun_type/:gun_type" component={Inventory} />
            <Route path="/manufacturer/:manufacturer" component={Inventory} />
            <Route path="/caliber/:caliber" component={Inventory} />

            <Route path="/inventory/model/:item_no" component={Details} />


            <Route path="/inventory/2/model/:item_no" component={zandersDetails} />
            <Route path="/inventory/2/category/:category" component={zandersInventory} />

            {/* <Route path="/inventory" component={About} /> */}

            <Route path="/admin" component={AdminPage} />

            <Route path="/api/post" component={AdminPage} />

            <Route path="/cds/inventory/:selection" component={CdsInventory} />
            <Route path="/cds/details/:id" component={CdsDetails} />

            <Route path="/cds/transfers" component={Transfers} />
            <Route path="/cds/about" component={About} />
            <Route path="/profile" component={ () => <Profile loggedIn={this.state.loggedIn} user={this.state.user} />} />



            <Route path="/aeroprecision" component={AeroPrecision} />

            <Route path="/lmt" component={LMT} />
            <Redirect to="/" />
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

}

export default App

