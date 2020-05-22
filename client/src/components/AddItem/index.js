import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AdminPanel from '../../components/AdminPanel/index';
import axios from 'axios';

// const queryString = require('query-string');

require("dotenv").config();

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoggedIn: false,
            catData: [],
            itemPosted: false,
            file: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.fileChanged = this.fileChanged.bind(this);
        this.img = React.createRef();
        this.name = React.createRef();
        this.description = React.createRef();
        this.msrp = React.createRef();
        this.price = React.createRef();
    }



    fileChanged(event) {
        console.log(event)
        var f = event.target.files;
        console.log(f)
        this.setState({
            file: f
        }, function () { console.log(this.state) });
        // console.log("state",this.state.file)

        // this.handleImage()
    }

    handleSubmit(event) {
        event.preventDefault()
        let img = this.img.current.value
        let name = this.name.current.value
        let description = this.description.current.value
        let msrp = this.msrp.current.value
        let price = this.price.current.value


        const filename = this.state.file[0].name

        const thisFormData = new FormData();
        thisFormData.append('element1', this.state.file[0]);
        var requestOptions = {
            method: 'POST',
            body: thisFormData,
            redirect: 'follow'
        };

        fetch("/api/upload/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        const postItem = () => {
            console.log("posting to DB")
            // POST TO DB
            fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: filename,
                    product_name: name,
                    product_description: description,
                    msrp_price: msrp,
                    sale_price: price
                })
                }).then(response => {
                    console.log("hey i did it")
                    console.log(response)
                    if (response.status == '200') {
                        this.setState({
                            itemPosted: true
                        })
                    }
            })

        }
        postItem()
     
    }


    render() {
        const { itemPosted } = this.state;
        if (!itemPosted) {
            return (
                <div className="m-5">
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" >

                        <Form.Label>Item Image</Form.Label>
                        <input
                            onChange={this.fileChanged.bind(this)}
                            ref={this.img}
                            type="file" required placeholder="Upload File" />


                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control ref={this.name} type="text" placeholder="Product Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control ref={this.description} as="textarea" rows="5" placeholder="Description" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>MSRP Price</Form.Label>
                            <Form.Control ref={this.msrp} type="number" step="0.01" placeholder="MSRP" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Listing Price</Form.Label>
                            <Form.Control ref={this.price} type="number" step="0.01" placeholder="Listing Price" />
                        </Form.Group>
                        <Button style={{ backgroundColor: '#dd6717' }} variant='dark' type="submit">
                            Submit
        </Button>
                    </form>
                </div>

            );
        } if (itemPosted) {
            return (
                <div>
                    <p className="text-center">Item has been posted!</p>
                    <AdminPanel itemPosted="true"></AdminPanel>
                    {/* <a href="/admin"><Button style={{ backgroundColor: '#dd6717', margin: '0px auto;' }} variant='dark'>Inventory List</Button></a> */}
                </div>
            )
        }
    }
    // if (isLoggedIn) {
    //     return (
    //         <AdminPanel></AdminPanel>

    //     );
    // }
}


export default AddItem;
