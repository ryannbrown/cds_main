import React, { Component } from "react";


require("dotenv").config();

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
     state: "hello I am Home's state"
    };
  }

  componentDidMount() {
  console.log("about us! ");
  }



  render() {
    return (
   <h1>About us!</h1>

    )
} }
    

export default About;
