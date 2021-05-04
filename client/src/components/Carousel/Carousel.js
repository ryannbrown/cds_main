
import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import App from "../../App"
import "./style.css"

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            createSession: false,
            posts: []
        };
    }

    // usePlaceholderImg(ev){
    //     ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
    //     console.log(ev);
    //   }



    fetchPosts() {
        fetch(`/api/posts/current/featured`)
            .then(res => res.json())
            .then(json => {
                // console.log("json", json)
                this.setState({
                    posts: json.data
                })
            })
    }

    componentDidMount() {

        this.fetchPosts();

    }


    render() {
        console.log(this.state.posts)
        const { createSession } = this.state;
        const items = this.state.posts.map((item, i) =>

            <Carousel.Item key={i}>
                <img
                    className="gun-img-carousel d-block" alt={`${item.product_name}`}
                    src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
                    onError={this.usePlaceholderImg}
                />
                <Carousel.Caption>
                    <h3>{item.product_name}</h3>
                    <a href={`/details/${item.uuid}`}><p>Click here for more information</p></a>
                </Carousel.Caption>
            </Carousel.Item>


            // <Card className='card inventory-card'>
            //     <a href={`/cds/details/${item.uuid}`}>
            //         <img className="gun-img" alt={`${item.itemdesc1}`}
            //             src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
            //             onError={this.usePlaceholderImg}
            //         />
            //         <h3 style={{ padding: '15px' }} className="text-center">{item.product_name}</h3>
            //         {/* <p className="text-center gun-desc">{item.product_description}</p> */}
            //         <h5 className="text-center retail-price">{item.msrp_price}</h5>
            //         <h4 className="text-center">{item.sale_price}</h4>
            //         <h4 className="text-center">{item.quantity}</h4>
            //         <h4 className="text-center">{item.caliber}</h4>
            //     </a>
            // </Card>
        );

        // const placeholderText = <div>There are no items in inventory</div>




        return (
            <div className="carousel-contents">
                <h1 className="carousel-title">current Inventory</h1>
                <Carousel>
                    {items}
                </Carousel>
            </div>

        )
    }
}
export default AdminPanel




