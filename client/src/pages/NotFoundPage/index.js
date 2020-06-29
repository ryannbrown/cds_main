import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import BrowseTabber from "../../components/BrowseTabber/BrowseTabber";
require("dotenv").config();

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     state: "hello I am Home's state",
    };
  }

  componentDidMount() {
  
  }



  render() {
    return (
 
      <div className="w-50 tc center error-page "><h1 className="mt6">We are sorry but this page does not exist</h1>
          {/* <SearchTool searchText="Try again"></SearchTool> */}
          <h1 className="mv5">Perhaps you wanted to see our inventory</h1>
          <BrowseTabber></BrowseTabber>
          <h1 className="mv5">Or <a style={{color: 'blue'}} blue href="/">go back </a>to the home page</h1>
          
        </div>
  
    )
} }
    

export default NotFoundPage;
