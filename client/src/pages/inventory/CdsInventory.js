
import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import App from "../../App"


class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            editSession: false,
            posts:[],
            updatePosts: false,
            itemDeleted: false,
            itemPosted: null,
            pageRefresh: false
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
              posts:json.data
          })
        })
    }

componentDidMount () {

    this.fetchPosts();
    
    }


    render() {
        console.log(this.state.posts)
        const { editSession } = this.state;
        const items = this.state.posts.map((item, i) =>
        <Card className= 'card'>
            <p className="text-center">{item.product_name}</p>
       <img className="gun-img" alt={`${item.itemdesc1}`}
        src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
        onError={this.usePlaceholderImg}
        />
         <p className="text-center">{item.product_description}</p>
         <p className="text-center retail-price">{item.msrp_price}</p>
         <p className="text-center">{item.sale_price}</p>
         
        </Card>
        );

        const placeholderText = <div>There are no items in inventory</div>


        if (!editSession) {
         
            return (

                <div className="text-center m-5">
                    <h1 style={{textTransform: 'uppercase'}} className="mt-5">In house shit</h1>
                    <CardDeck>
                     {items}
                    </CardDeck>

                </div>
            )
        } 

        if (this.state.posts.length === 0) {
            return (
                <div className="text-center m-5">
                    {placeholderText}
                        
                </div>
            )
        }
    }
}
export default AdminPanel




