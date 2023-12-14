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
                    Chat with the restraunts in your area to check for the available donations
                </p>
                <button>
                <Link to="/chat" >Chat with restraunts</Link>
                    </button>
            </div>
            <div className="column-left">
            <h1>Connect with restraunts</h1>
                <p>
                Chat with the NGO's for donation requirements.

                </p>
                <button>
                <Link to="/chat" >Chat with restraunts</Link>
                    </button>
            </div>
        </div>
    </section>
  )
}

export default Donations