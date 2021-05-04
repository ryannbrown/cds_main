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
        this.isFeatured = React.createRef();
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
        let location = this.location.current.value
        let isFeatured = this.isFeatured.current.checked


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
                    isFeatured: isFeatured
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
                    <h1>Add Item</h1>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" >

                        <Form.Label>Image</Form.Label>
                        <input
                            onChange={this.fileChanged.bind(this)}
                            ref={this.img}
                            type="file" required placeholder="Upload File" />


                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control ref={this.category} as="select" placeholder="What kind of product is this?.. suppressors, long guns, optics etc">
                            <option>suppressors</option>
                                <option>handguns</option>
                                <option>rifles</option>
                                <option>shotguns</option>
                                <option>optics</option>
                                <option>parts & accessories</option>
                                <option>night vision</option>
                                <option>ammunition</option>
                                <option>lower receivers</option>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Location on site:</Form.Label>
                            <Form.Control ref={this.location} as="select">
                                <option>featured</option>
                                <option>aeroprecision</option>
                                <option>lmt</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formFeatured">
                            <Form.Check  ref={this.isFeatured} type="checkbox" label="Do you want to show this in featured slideshow?" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control ref={this.name} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control ref={this.description} type="textarea" rows="5" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Caliber</Form.Label>
                            <Form.Control ref={this.caliber} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Manufacturer</Form.Label>
                            <Form.Control ref={this.manufacturer} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Model</Form.Label>
                            <Form.Control ref={this.model} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Type</Form.Label>
                            <Form.Control ref={this.type} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Barrel Length</Form.Label>
                            <Form.Control ref={this.barrelLength} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Finish</Form.Label>
                            <Form.Control ref={this.finish} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control ref={this.capacity} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Sights</Form.Label>
                            <Form.Control ref={this.sights} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>UPC #</Form.Label>
                            <Form.Control ref={this.upcNumber} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>MSRP Price</Form.Label>
                            <Form.Control placeholder="Leave blank and it won't show up" ref={this.msrp} type="number" step="0.01" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Listing Price</Form.Label>
                            <Form.Control ref={this.price} type="number" step="0.01" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control ref={this.quantity} type="number" />
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
