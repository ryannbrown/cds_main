import React, { Component, Fragment } from "react";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import './style.css'
require("dotenv").config();


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "hello I am Home's state",
            itemPosted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.fileChanged = this.fileChanged.bind(this);
        // this.id = React.createRef();
        this.first_name = React.createRef();
        this.last_name = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.verPassword = React.createRef();

    }

    componentDidMount() {
        // console.log("id:", this.props.id)

        fetch(`/api/users`)
            .then(res => res.json())
            .then(json => {
                console.log("users", json.data)
                //   this.setState({
                //     gunData: json.data[0],
                //     isLoading: false,
                //   })
                //   var size = Object.keys(this.state.gunData).length;
                //   console.log(size);
            })
    }

    componentDidUpdate() {

        // if (this.state.itemPosted) {
        //     window.location.href =`/`
        // }

    }


    handleSubmit(event) {
        event.preventDefault()
        let first_name = this.first_name.current.value
        let last_name = this.last_name.current.value
        let email = this.email.current.value
        let password = this.password.current.value
        let verPassword = this.verPassword.current.value


        const addUser = () => {
            console.log("posting to DB")
            // POST TO DB
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                })
            }).then(response => {
                console.log("hey i did it")
                console.log(response)
                if (response.status == '200') {
                    this.setState({
                        itemPosted: true,
                    })

                } else if (response.status == '400') {
                    this.setState({
                        errorPage: true
                    })
                }
            })

        }

        if (password === verPassword) {
            addUser()
        } else {
            alert("passwords did not match")
        }


    }



    render() {

        const { errorPage, itemPosted } = this.state;

        if (itemPosted) {
            return (
                <div className="reg-success mv5 tc f2 1h-solid w-75 center">
                    <Alert variant="success">
                        <h2>You have successfully created an account at Coleman Defense</h2>
                        <hr />
                        <p>Please click the "Login/Register" button again and login with your credentials.</p>
                      

                    </Alert>
                </div>
            )
        }

        if (errorPage) {
            return (
                <div className="w-50 tc center error-page "><h1 className="mt6">This email already exists on our server.</h1>
                    <h2>Contact us if you need to retrieve your password </h2>
                    <a href="/cds/registration"><Button>Try Again</Button></a>
                </div>
            )
        }

        return (
            <Fragment>
                <div className="mv4 pa4">
                    <h1>Register at Coleman Defense Solutions</h1>
                    <p>Your information is secure</p>
                    <form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control ref={this.first_name} type="text" />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control ref={this.last_name} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                            <Form.Control ref={this.email} type="email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={this.password} type="password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Please Confirm Password</Form.Label>
                            <Form.Control ref={this.verPassword} type="password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Would you like to subscribe to mailing list? NO Spam, just sweet new guns and stuff like that." />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </form>

                </div>

            </Fragment>
        )
    }
}


export default Registration;
