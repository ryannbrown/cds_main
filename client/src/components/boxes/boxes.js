import React from "react"
// import './style.css'
// import { Link } from "gatsby"
/**
 * Change the content to add your own bio
 */


class MobileBoxes extends React.Component {
    constructor(props) {
        super(props)
    }


render() {
    const { name, id, link } = this.props;
    return (
        
        <div class={`content-box ${id} hvr-pulse`}>
        <p>{this.props.text}</p>
       
    </div>
    )
}
}

export default MobileBoxes