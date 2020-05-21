import React, { Component } from "react";
import "../Home";
import { Card, ListGroup, ListGroupItem, Button, Image, CardDeck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AdminPanel from '../../components/AdminPanel/index';

// const queryString = require('query-string');

require("dotenv").config();

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoggedIn: false,
            catData: [],
            email: '',
            pass: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.email = React.createRef();
        this.pass = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        let email = this.email.current.value
        let pass = this.pass.current.value

        // if (pass === 'password1' && email ==='michael.judy@colemandefense.com') {
        if (pass === 'test' && email === 'test@cd.com') {
            this.setState({
                isLoggedIn: true
            })
        } else {
        }


    }


    //   ReactDOM.findDOMNode(ref)

    render() {
        const { isLoggedIn } = this.state;

        if (!isLoggedIn) {
            return (
                <div className="m-5">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={this.email} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
          </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={this.pass} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button style={{ backgroundColor: '#dd6717' }} variant='dark' type="submit">
                            Submit
        </Button>
                    </Form>
                </div>

            );
        }
        // TODO: PASS in is logged in props
        if (isLoggedIn) {
            return (
                <AdminPanel isLoggedIn ={isLoggedIn}></AdminPanel>

            );
        }
    }
}

export default AdminPage;
