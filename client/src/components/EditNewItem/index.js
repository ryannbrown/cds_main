import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AdminPanel from '../../components/AdminPanel/index';
import axios from 'axios';

// const queryString = require('query-string');

require("dotenv").config();

class EditNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoggedIn: false,
            catData: [],
            itemUpdated: false,
            file: null,
            gunData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.fileChanged = this.fileChanged.bind(this);
        this.img = React.createRef();
        this.name = React.createRef();
        this.description = React.createRef();
        this.msrp = React.createRef();
        this.price = React.createRef();
    }



    componentDidMount () {
        console.log("id:", this.props.id)

        fetch(`/api/posts/${this.props.id}`)
        .then(res => res.json())
        .then(json => {
          console.log("inventory", json.data[0])
          this.setState({
            gunData: json.data[0],
            isLoading: false,
          })
          var size = Object.keys(this.state.gunData).length;
          console.log(size);
        })
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
        // let img = this.img.current.value
        let name = this.name.current.value
        let description = this.description.current.value
        let msrp = this.msrp.current.value
        let price = this.price.current.value

       
    //     const filename = this.state.file[0].name
    //     if (filename) {
    //     const thisFormData = new FormData();
    //     thisFormData.append('element1', this.state.file[0]);
    //     var requestOptions = {
    //         method: 'POST',
    //         body: thisFormData,
    //         redirect: 'follow'
    //     };
    // }


        // fetch("/api/upload/", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));

        const postItem = () => {
            console.log("Updating DB")
            // POST TO DB
            fetch('/api/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // image: this.state.file[0].name,
                    product_name: name,
                    product_description: description,
                    msrp_price: msrp,
                    sale_price: price,
                    id: this.props.id
                })
                }).then(response => {
                    console.log("Updated!")
                    console.log(response)
                    if (response.status == '200') {
                        this.setState({
                            itemUpdated: true
                        })
                    }
            })

        }
        postItem()
     
    }


    render() {
        const { itemUpdated, gunData } = this.state;


        if (!itemUpdated) {
            return (
                <div className="m-5">
                    <h1>Edit Item</h1>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" >

                        <Form.Label>Item Image</Form.Label>
                        {/* <input
                            onChange={this.fileChanged.bind(this)}
                            ref={this.img}
                            type="file" placeholder="Upload File" /> */}


                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Name: {gunData.product_name}</Form.Label>
                            <Form.Control ref={this.name} type="text" placeholder="Edit Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Description: {gunData.product_description}</Form.Label>
                            <Form.Control ref={this.description} as="textarea" rows="5" placeholder="Edit Description" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>MSRP Price: {gunData.msrp_price}</Form.Label>
                            <Form.Control ref={this.msrp} type="number" step="0.01" placeholder="Edit MSRP" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Listing Price: {gunData.sale_price}</Form.Label>
                            <Form.Control ref={this.price} type="number" step="0.01" placeholder="Edit Listing Price" />
                        </Form.Group>
                        <Button style={{ backgroundColor: '#dd6717' }} variant='dark' type="submit">
                            Submit
        </Button>
                    </form>
                </div>

            );
        } if (itemUpdated) {
            return (
                <div>
                    <p className="text-center">Item updated!</p>
                    <AdminPanel itemUpdated="true"></AdminPanel>
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


export default EditNewItem;
