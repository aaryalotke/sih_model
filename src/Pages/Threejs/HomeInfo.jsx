import React from 'react'
import { Link } from 'react-router-dom'

const InfoBox = ({text, link, btnText}) =>(
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
            {text}
            </p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1  className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'
        >Hi, I am <span className='font-semibold'>Tarun</span>👋
        <br />
        A Software Engineer from India.
        </h1>
    ),
    2: (
        <InfoBox
        text="Worked with many companies and picked up many skills along the way"
        link='/about'
        btnText="Learn more"
        />
        
        ),
    3: (
        <InfoBox
        text="Worked with many companies and picked up many skills along the way"
        link='/projects'
        btnText="Visit my portfolio"
        />
        ),
    4: (
        <InfoBox
        text="Worked with many companies and picked up many skills along the way"
        link='/contact'
        btnText="Let's talk"
        />
        ),
    5: (
        <div>

        <div id="animation"></div>
        <h1 className="text-white">
            Drag to Explore
        </h1>

        </div>

    )

    }


const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo