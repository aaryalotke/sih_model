import React from 'react'
import "./index.css"
import { Link } from 'react-router-dom'

const Donations = () => {
  return (

    <section className="hero">
        <div className="hero-container">
            <div className="column-left">
                <h1>Connect with NGO</h1>
                <p>
                    Chat with the restaurants in your area to check for the available donations
                </p>
                <button id='donation'>
                <Link to="/chat" >Chat with restaurants</Link>
                    </button>
            </div>
            <div className="column-left">
            <h1>Connect with Restaurants</h1>
                <p>
                Chat with the NGO's for donation requirements and contribute to the society.

                </p>
                <button id='donation'>
                <Link to="/chat" >Chat with NGOs </Link>
                    </button>
            </div>
        </div>
    </section>
  )
}

export default Donations