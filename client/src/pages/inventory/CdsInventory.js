import React, { Component } from "react";
import { Carousel, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Image,
  CardDeck,
  Spinner,
} from "react-bootstrap";
import App from "../../App";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      createSession: false,
      posts: [],
    };
  }

  usePlaceholderImg(ev) {
    ev.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg";
    console.log(ev);
  }

  fetchPosts(selection, category) {
    this.setState({
      isLoading: true,
    });
    fetch(`/api/posts/${selection}/${category}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        this.setState({
          posts: json.data,
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    console.log(this.props.match.params);
    let selection = this.props.match.params.selection;
    let category = this.props.match.params.category;

    this.fetchPosts(selection, category);
  }

  componentDidUpdate(prevProps) {
    let selection = this.props.match.params.selection;
    let category = this.props.match.params.category;
    //to load in new items based on category
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.fetchPosts(selection, category);
    }
  }

  render() {
    console.log(this.state.posts)
    const { isLoading } = this.state;
    const items = this.state.posts.map((item, i) => (
      <Card className="card inventory-card">
        
        <Link to={`/details/${item.uuid}`}>
          <img
            className="gun-img"
            alt={`${item.itemdesc1}`}
            src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
            onError={this.usePlaceholderImg}
          />
          <h3 style={{ padding: "15px" }} className="text-center">
            {item.product_name}
          </h3>
          {/* <p className="text-center gun-desc">{item.product_description}</p> */}
          {item.msrp_price !== "$0.00" && (
            <h5 className="text-center retail-price">{item.msrp_price}</h5>
          )}
          <h4 className="text-center">{item.sale_price}</h4>
          <h4 className="text-center">{item.quantity} available</h4>
          {/* <h4 className="text-center">{item.caliber}</h4> */}
        </Link>
      </Card>
    ));

    const placeholderText = <div>There are no items in inventory</div>;

    if (isLoading) {
      return (
        <div className="spinner-box">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div className="cds-inv-page">
          <div className="mobile-menu">
            <NavDropdown title="Browse Categories" id="basic-nav-dropdown">
              <NavDropdown.Item
                eventKey="4"
                as={Link}
                to="/inventory/current/all"
              >
                All Inventory
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="5" as={Link} to="/aeroprecision">
                {" "}
                Aero Precision
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="6" as={Link} to="/lmt">
                {" "}
                Lewis Machine & Tool
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                eventKey="7"
                as={Link}
                to="/inventory/current/suppressors"
              >
                suppressors
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="8"
                as={Link}
                to="/inventory/current/handguns"
              >
                handguns
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="9"
                as={Link}
                to="/inventory/current/rifles"
              >
                rifles
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="10"
                as={Link}
                to="/inventory/current/shotguns"
              >
                shotguns
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="11"
                as={Link}
                to="/inventory/current/optics"
              >
                optics
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="12"
                as={Link}
                to="/inventory/current/parts & accessories"
              >
                parts & accessories
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="13"
                as={Link}
                to="/inventory/current/night vision"
              >
                night vision
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="14"
                as={Link}
                to="/inventory/current/ammunition"
              >
                ammunition
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="15"
                as={Link}
                to="/inventory/current/lower receivers"
              >
                lower receivers
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <div className="side-menu">
            <NavLink
              to="/inventory/current/all"
              activeStyle={{
                opacity: 1,
              }}
            >
              All
            </NavLink>
            <NavLink
              to="/inventory/current/suppressors"
              activeStyle={{
                opacity: 1,
              }}
            >
              suppressors
            </NavLink>
            <NavLink
              to="/inventory/current/handguns"
              activeStyle={{
                opacity: 1,
              }}
            >
              handguns
            </NavLink>
            <NavLink
              to="/inventory/current/rifles"
              activeStyle={{
                opacity: 1,
              }}
            >
              rifles
            </NavLink>
            <NavLink
              to="/inventory/current/shotguns"
              activeStyle={{
                opacity: 1,
              }}
            >
              shotguns
            </NavLink>
            <NavLink
              to="/inventory/current/optics"
              activeStyle={{
                opacity: 1,
              }}
            >
              optics
            </NavLink>
            <NavLink
              to="/inventory/current/parts & accessories"
              activeStyle={{
                opacity: 1,
              }}
            >
              parts/accessories
            </NavLink>
            <NavLink
              to="/inventory/current/night vision"
              activeStyle={{
                opacity: 1,
              }}
            >
              night vision
            </NavLink>
            <NavLink
              to="/inventory/current/ammunition"
              activeStyle={{
                opacity: 1,
              }}
            >
              ammunition
            </NavLink>
            <NavLink
              to="/inventory/current/lower receivers"
              activeStyle={{
                opacity: 1,
              }}
            >
              lower receivers
            </NavLink>
          </div>
          <a href="/">
            <Button
              variant="dark"
              style={{ backgroundColor: "#dd6717" }}
              className="transf-back-btn"
            >
              Back
            </Button>
          </a>
          <div className="text-center item-container">
            <h1 style={{ textTransform: "uppercase" }} className="mt-5">
              {this.props.match.params.category}
            </h1>
            <CardDeck className="mb-5">
            {this.state.posts.length < 1 && <h2>No items currently available in this category</h2>}
                {items}</CardDeck>
            {/* <a href="tel:9193571884"> <div className="order-box center-block"> <p className="order-box-text ">Call To Order</p></div></a> */}
          </div>
        </div>
      );
    }
  }
}
export default AdminPanel;
