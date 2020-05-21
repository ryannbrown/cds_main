
import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import App from '../../App'
import AddItem from '../AddItem'


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
        this.handleDelete = this.handleDelete.bind(this);
    }

    usePlaceholderImg(ev){
        ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
        console.log(ev);
      }

    addItem = (event) => {
       this.setState({
            editSession:true
        })
    }
   refreshFeed = (event) => {
       this.setState({
           pageRefresh: true
       }, console.log(this.state.pageRefresh))
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

    handleDelete = id => {
        let item_id = id
        console.log("deleting", item_id)

       const deleteItem = () =>{
           console.log("posting to DB")
            // POST TO DB
            fetch('/api/remove_post', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: item_id,
                })
            })
            this.setState({
                itemDeleted:true
            })
        }
        deleteItem();
        this.fetchPosts()
    }

componentDidMount () {

    this.fetchPosts();
    
    }


    render() {
        console.log(this.state.posts)
        const { editSession } = this.state;
        const items = this.state.posts.map((item, i) =>
        <Card className= 'card'>
            <span onClick={() => this.handleDelete(item.id)} className="delete-icon">X</span>
            <p className="text-center">{item.product_name}</p>
       <img className="gun-img" alt={`${item.itemdesc1}`}
        src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
        onError={this.usePlaceholderImg}
        />
         <p className="text-center">{item.product_description}</p>
         <p className="text-center">{item.msrp_price}</p>
         <p className="text-center">{item.sale_price}</p>
         
        </Card>
        );

        const placeholderText = <div>There are no items in inventory</div>

// TO DO: Pass in isloggedin props
        if (editSession) {
            return (
                <AddItem></AddItem>
            )
        }

        if (this.state.posts.length === 0) {
            return (
                <div className="text-center m-5">
                    <Button style={{ backgroundColor: '#dd6717' }} variant='dark' onClick={this.addItem}>Add Item</Button>
                    <div className="mt-5">Current Inventory:</div>
                    <div className="mt-3">
                    {placeholderText}
                    </div>                
                </div>
            )
        }

        if (!editSession) {
         
            return (

                <div className="text-center m-5">
                   
                    <Button style={{ backgroundColor: '#dd6717' }} variant='dark' onClick={this.addItem}>Add Item</Button>
                    {/* <i onClick={this.refreshFeed} style={{display: 'block'}} className="mt-3">refresh</i> */}
                    <div className="mt-5">Current Inventory:</div>
                    <CardDeck>
                     {items}
                    </CardDeck>

                </div>
            )
        } 
    }
}
export default AdminPanel




