import React, {useState, browserHistory} from "react";
import { Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'

// import './style.css';
function SearchTool(props) {

  const [name, setName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(name)
    window.location.href =`/inventory/model/${name}`;
}
  


  // TO DO: potentially use this logic to render component
  // const renderComponent = () => {
  //   console.log("hi")
  // }

  return (
 
  <Form onSubmit={handleSubmit} inline>
       <FormControl type="text"  value={name} onChange={e => setName(e.target.value)}   placeholder={props.searchText} className="mr-sm-2" />
       <Button onSubmit={handleSubmit} type="submit" className="search-btn" variant="outline-success">Search</Button>
    </Form>
 
  )
}

export default SearchTool;