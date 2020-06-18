
import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Spinner } from 'react-bootstrap';
import App from "../../App"


class CdsInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            createSession: false,
            posts:[]
        };
    }

    usePlaceholderImg(ev){
        ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
        console.log(ev);
      }



    fetchPosts() {
        fetch(`/api/posts`)
        .then(res => res.json())
        .then(json => {
          console.log("json", json)
          this.setState({
              posts:json.data,
              isLoading: false
          })
        })
    }

componentDidMount () {

    this.fetchPosts();
    
    }


    render() {
        console.log(this.state.posts)
        const { isLoading } = this.state;
        const items = this.state.posts.map((item, i) =>
        <Card className= 'card inventory-card'>
            <a href={`/cds/details/${item.uuid}`}>
       <img className="gun-img" alt={`${item.itemdesc1}`}
        src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
        onError={this.usePlaceholderImg}
        />
        <h3 style= {{padding: '15px'}} className="text-center">{item.product_name}</h3>
         {/* <p className="text-center gun-desc">{item.product_description}</p> */}
         <h5 className="text-center retail-price">{item.msrp_price}</h5>
         <h4 className="text-center">{item.sale_price}</h4>
         {/* <h4 className="text-center">{item.quantity}</h4>
         <h4 className="text-center">{item.caliber}</h4> */}
         </a>
        </Card>
        );

        const placeholderText = <div>There are no items in inventory</div>

        if (isLoading) {
            return (
              <div className="spinner-box">
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          </div> )
          }
      
          else {
            return (
                <div>
                    <a href="/">
                <Button variant="dark" style={{ backgroundColor: '#dd6717' }} className="transf-back-btn">Back</Button>
                </a>
                <div className="text-center mt-5">
                    
                    <h1 style={{textTransform: 'uppercase'}} className="mt-5">Current Inventory</h1>
                    <CardDeck className="mb-5">
                     {items}
                    </CardDeck>
                    <a href="tel:9193571884"> <div className="order-box center-block"> <p className="order-box-text ">Call To Order</p></div></a>

                </div>
                </div>
            )
        } 
    }
}
export default CdsInventory




