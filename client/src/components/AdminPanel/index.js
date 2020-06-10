
import React, { Component, useState } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck, Modal } from 'react-bootstrap';
import App from '../../App'
import AddItem from '../AddItem'
// import EditItem from '../EditItem/index.js'
import EditNewItem from '../EditNewItem/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            createSession: false,
            editSession: false,
            posts: [],
            updatePosts: false,
            itemDeleted: false,
            itemPosted: null,
            pageRefresh: false,
            show: false,
            setShow: false
        };
        // this.handleDelete = this.handleDelete.bind(this);
    }

    usePlaceholderImg(ev) {
        ev.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/15/No_image_available_600_x_450.svg'
        console.log(ev);
    }

    addItem = (event) => {
        this.setState({
            createSession: true
        })
    }
    editItem = (name, uuid) => {
        console.log("editting", uuid)
        this.setState({
            editSession: true,
            editId: uuid
        })
    }
    refreshFeed = (event) => {
        this.setState({
            pageRefresh: true
        }, console.log(this.state.pageRefresh))
    }

    handleShow = (name,id) => {
        console.log("Modal for:", name)
        console.log("id to delete:", id)
        this.setState({
            show: true,
            setShow: true,
            showDialogue: name,
            showId: id
        })
    }
    handleClose = () => {
        this.setState({
            show: false,
            setShow: false
        })
    }


    fetchPosts() {
        fetch(`/api/posts`)
            .then(res => res.json())
            .then(json => {
                console.log("json", json)
                this.setState({
                    posts: json.data
                })
            })
    }

 

    handleDelete = id => {
        let item_id = id
        console.log("deleting", item_id)

        const deleteItem = () => {
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
                itemDeleted: true,
                show: false
            })
        }
        deleteItem();
        this.fetchPosts()
    }

    componentDidMount() {

        this.fetchPosts();

    }


    render() {

        console.log(this.state.posts)
        const { createSession, editSession, show, showDialogue, showId, editId} = this.state;
        console.log(editSession)
        const items = this.state.posts.map((item, i) =>
            <Card key={i} className='card'>
                <span onClick={() => this.handleShow(item.product_name, item.id)}  className="delete-icon"><FontAwesomeIcon icon={faTrash} /></span>
                <span onClick={() => this.editItem(item.product_name, item.uuid)}  className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
                <p className="text-center">Product Name: {item.product_name}</p>
                <img className="gun-img" alt={`${item.itemdesc1}`}
                    src={`https://cdsinventoryimages.s3.amazonaws.com/${item.image}`}
                    onError={this.usePlaceholderImg}
                />
                {/* <p className="text-center">Item Description: {item.product_description}</p> */}
                <p className="text-center">MSRP Price: {item.msrp_price}</p>
                <p className="text-center">Sale Price: {item.sale_price}</p>
                <a target="_blank" href={`/cds/details/${item.uuid}`}><Button variant="dark">See Listing</Button></a>
                
                {/* Modal for confirming deletion */}
                <Modal centered show={show} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Delete Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete {showDialogue}?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => this.handleDelete(showId)}>
                                Delete
                                </Button>
                        </Modal.Footer>
                    </Modal>

            </Card>
        );

        const placeholderText = <div>There are no items in inventory</div>


        if (editSession) {
            return (
                <EditNewItem id={editId} />
            )
        }

        if (createSession) {
            return (
                <AddItem/>
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

        if (!createSession) {

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




