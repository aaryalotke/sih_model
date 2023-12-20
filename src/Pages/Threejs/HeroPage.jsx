import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Island from '../../models/Island'
import Sky from '../../models/Sky'
import HomeInfo from './HomeInfo'
import hero from '../back_hero.png'


const HeroPage = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  const [isRotating, setIsRotating] = useState(false);

  const [currentStage, setCurrentStage] = useState(5);


  
  const adjustIslandForScreenSize = () =>{
    let screenScale, screenPosition, rotation;
    
    screenScale = null;
    // screenPosition = [0, -1.5, -43];
    // screenPosition = [0, -6.5, -43];
    screenPosition = [0, -2, -1];
    rotation = [0.1, 4.7, 0];
    if(window.innerWidth < 768){
      screenScale = [1, 1, 1];
    }else{
      screenScale = [1,1,1];
    }

    return [screenScale, screenPosition, rotation];
  }
  const adjustPlaneForScreenSize = () =>{
    let screenScale, screenPosition;
    
    if(window.innerWidth < 768){
      screenScale = [0.8, 0.8, 0.8];
      screenPosition = [0, -1, 2];
    }else{
      screenScale = [1,1,1];
      screenPosition = [0, -1, 2]
    }

    return [screenScale, screenPosition];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section  style={{ backgroundImage: `url(${require('../../assets/resto_bg.jpg') })` }}
 className={`w-full h-screen relative ${isRotating? 'cursor-grabbing': 'cursor-grab'}`}
    >
      {/* <div  className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div> */}
      <Canvas
       className='w-full h-screen bg-transparent'
       camera={{near: 0.1, far: 1000}}>
        {/* Suspense is used for objects that change every second */}
        {/* fallback is used for rendering the loading screen until elements are loaded */}
          <directionalLight  position={[1,1,1]} 
           intensity={2}/> 
          <ambientLight intensity={0.6}/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"/>
        <Suspense fallback={<Loader/>}>
          
          {/* <Sky
            isRotating={isRotating}
          /> */}
          <Island 
            position={islandPosition}
            scale={islandScale}
            rotation = {islandRotation}
            isRotating = {isRotating}
            setIsRotating = {setIsRotating}
            setCurrentStage = {setCurrentStage}
          />

        </Suspense>
      </Canvas>
      <div className='absolute bottom-2 left-2'>
        
      </div>

      
      
   {/* //Features */}
   <div className=" bg-[#272635] w-screen h-[35rem] p-[6rem] text-[#B1E5F2]">
        <h2 className="font-unica text-5xl">Revolutionalize your profits!</h2>

        <div className="grid grid-cols-3 justify-center mt-[1rem] font-worksans text-lg overflow-hidden p-9">
          <div className="w-[20rem] h-[7rem] p-4 m-5">
            <h2>Dynamic Pricing</h2>
            <h2>Discover price optimization with real-time ingredient costs.</h2>
          </div>

          <div className="w-[20rem] h-[7rem] p-4 m-5">
            <h2>User Dashboard</h2>
            <h2>Monitor your menu items with ease in our platform.</h2>
          </div>

          <div className="w-[20rem] h-[7rem] p-4 m-5">
            <h2>Real-time Data</h2>
            <h2>Stay up-to-date on market trends with ingredient cost tracking.</h2>
          </div>

          <div className="w-[20rem] h-[7rem] p-4 m-5">
            <h2>Data Analytics</h2>
            <h2>Unlock insights and maximize profits using historical data.</h2>
          </div>

          <div className="w-[20rem] h-[7rem] p-4 m-5">
            <h2>Smart Decisions</h2>
            <h2>Automate pricing choices based on smart algorithms.</h2>
          </div>

          <div className="w-[20rem] h-[7rem] p-4 m-5">
            <h2>Reachout to other restraunts</h2>
            <h2>Collaborate with other restraunts to host your unique dishes to the world around.</h2>
          </div>
        </div>
    </div>

    {/* faq */}

    <div className="bg-[#A6A6A8] p-[6rem]">
    <h2 className="text-[#272635] font-unica text-5xl">FAQ</h2>
    <div className="flex flex-row align-center justify-center  m-8">
    <img src="https://picsum.photos/id/42/367/267" className="rounded-lg saturate-0 w-[35rem] h-[25rem]" alt="" />
      <div className="font-worksans m-[2rem] w-[40rem] h-[20rem] self-center">
        <h2 className="text-3xl">What restaurants can benefit from ByteBistro?</h2>
        <h2>All types of food businesses can utilize ByteBistro’s pricing platform to optimize their profitability.</h2>
      </div>
       </div>

    <div className="flex flex-row align-center justify-center m-8">
      <div className="font-worksans  m-[2rem] w-[40rem] h-[20rem] self-center">
        <h2 className="text-3xl">How does the dynamic pricing algorithm work?</h2>
        <h2>Our algorithm takes real-time ingredient costs and historical data to adjust your menu prices intelligently.</h2>
      </div>
      <img src="https://picsum.photos/id/42/367/267" className="rounded-lg saturate-0 w-[35rem] h-[25rem]" alt="" />
    </div>


    <div className="flex flex-row align-center justify-center m-8">
    <img src="https://picsum.photos/id/42/367/267" className="rounded-lg saturate-0 w-[35rem] h-[25rem]" alt="" />
      <div className="font-worksans m-[2rem] w-[40rem] h-[20rem] self-center">
        <h2 className="text-3xl">Does ByteBistro integrate with existing systems?</h2>
        <h3>Yes, our platform can be easily integrated with your current systems for seamless adoption.</h3>
      </div>
      
    </div>

    <div className="flex flex-row align-center justify-center m-8">
      <div className="font-worksans m-[2rem] w-[40rem] h-[20rem] self-center">
        <h2 className="text-3xl">Is ByteBistro secure and reliable?</h2>
        <h3>We prioritize the security and reliability of our platform, ensuring your data is safe and dependable.
        </h3>
      </div>
      <img src="https://picsum.photos/id/42/367/267" className="rounded-lg saturate-0 w-[35rem] h-[25rem]" alt="" />
    </div>


    </div>

    <div className="bg-[#A6A6A8] p-[6rem]">
        <h2 className="font-unica text-5xl ">Ready to transform your pricing game? Get started today!</h2>
        
        <div className="  text-lg font-worksans flex ">
        <button className="m-4 p-4 bg-black text-white rounded-full" ><Link onClick={scrollToTop} to="/login">JOIN BYTEBISTRO</Link></button>
        <button className="m-4 p-4 bg-[#B1E5F2] rounded-full">KNOW MORE</button>
        </div>
    </div>
    </section>
  )
}

export default HeroPage