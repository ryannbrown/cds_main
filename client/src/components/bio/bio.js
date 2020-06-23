import React from "react"
import { Link } from "react-router-dom";
// import './style.css'
import image from "../../media/field.JPG"
/**
 * Change the content to add your own bio
 */


class Bio extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (

            <div className="bio-box">
                <img className="bio-img" src={image}></img>
                <div className="bio-text">
                    <h1>About Coleman Defense</h1>
                    <p>I am an FFL/Class 3 SOT dealer located in Durham, NC. I specialize in high end weaponry for both civilians and law enforcement agencies. As a Marine Corps combat <a className="secret-sauce" href="/admin">veteran</a> with years of weapons training and experience, I started this business to offer my clients a much more personalized gun buying experience that you won't get at your typical gun store or big box stores. As a Class 3 SOT dealer, I am able to sell and transfer NFA items to include: Silencers, Short Barreled Rifles, Short Barreled Shotguns, and Machine guns. I am a direct dealer for Lewis Machine & Tool and Aero Precision.</p>
                    <p style={{color:"#dd6717"}}> *Coleman Defense Solutions is not a commercial storefront. I am a home based dealer operating this business part-time. I operate on an appointment only basis, but feel free to contact me at any time.</p>
                </div>
            </div>
        )
    }
}

export default Bio;