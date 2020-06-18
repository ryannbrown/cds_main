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
        this.category = React.createRef();
        this.name = React.createRef();
        this.description = React.createRef();
        this.caliber = React.createRef();
        this.capacity = React.createRef();
        this.description = React.createRef();
        this.manufacturer = React.createRef();
        this.model = React.createRef();
        this.type = React.createRef();
        this.barrelLength = React.createRef();
        this.finish = React.createRef();
        this.quantity = React.createRef();
        this.sights = React.createRef();
        this.upcNumber = React.createRef();
        this.msrp = React.createRef();
        this.price = React.createRef();
        this.location = React.createRef();
    }



    componentDidMount () {
        console.log("id:", this.props.id)

        fetch(`/api/details/${this.props.id}`)
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
        let category = this.category.current.value
        let name = this.name.current.value
        let description = this.description.current.value
        let caliber = this.caliber.current.value
        let manufacturer = this.manufacturer.current.value
        let model = this.model.current.value
        let type = this.type.current.value
        let barrelLength = this.barrelLength.current.value
        let finish = this.finish.current.value
        let quantity = this.quantity.current.value
        let capacity = this.capacity.current.value
        let sights = this.sights.current.value
        let upcNumber = this.upcNumber.current.value
        let msrp = this.msrp.current.value
        let price = this.price.current.value
        let location = this.location.current.value.toLowerCase()

       
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
                    category: category,
                    caliber: caliber,
                    manufacturer: manufacturer,
                    model: model,
                    type: type,
                    barrelLength: barrelLength,
                    finish: finish,
                    quantity: quantity,
                    capacity: capacity,
                    sights: sights,
                    upcNumber: upcNumber,
                    msrp_price: msrp,
                    sale_price: price,
                    location: location,
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
                            <Form.Label>Product Category: {gunData.category}</Form.Label>
                            <Form.Control ref={this.category} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Location on site: {gunData.location}</Form.Label>
                            <Form.Control ref={this.location} as="select">
                                <option selected>{gunData.location}</option>
                                <hr></hr>
                                <option>aeroprecision</option>
                                <option>lmt</option>
                                <option>featured</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Caliber: {gunData.caliber}</Form.Label>
                            <Form.Control ref={this.caliber} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Manufacturer: {gunData.manufacturer}</Form.Label>
                            <Form.Control ref={this.manufacturer} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Model: {gunData.model}</Form.Label>
                            <Form.Control ref={this.model} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Type: {gunData.type}</Form.Label>
                            <Form.Control ref={this.type} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Barrel Length: {gunData.barrelLength}</Form.Label>
                            <Form.Control ref={this.barrelLength} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Finish: {gunData.finish}</Form.Label>
                            <Form.Control ref={this.finish} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Capacity: {gunData.capacity}</Form.Label>
                            <Form.Control ref={this.capacity} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Sights: {gunData.sights}</Form.Label>
                            <Form.Control ref={this.sights} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>UPC #: {gunData.upcNumber}</Form.Label>
                            <Form.Control ref={this.upcNumber} type="text"  />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>MSRP Price: {gunData.msrp_price}</Form.Label>
                            <Form.Control ref={this.msrp} type="number" step="0.01" placeholder="Edit MSRP" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Listing Price: {gunData.sale_price}</Form.Label>
                            <Form.Control ref={this.price} type="number" step="0.01" placeholder="Edit Listing Price" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Quantity: {gunData.quantity}</Form.Label>
                            <Form.Control ref={this.quantity} type="number" />
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
