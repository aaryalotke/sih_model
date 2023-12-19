import { Link } from 'react-router-dom';
import hero from './back_hero.png'

function Landing() {

  return (
    <>
      <div className="relative bg-[#000000] m-0 pt-3 w-screen h-screen flex justify-center">
        

        <div className="text-center leading-[45rem]">
        <h1 className="font-unica text-[#CECECE] text-[12rem] z-20 relative">BYTEBISTRO</h1>
        </div>

        <div className="top-[5rem] scale-0.5 flex absolute w-[600px] h-[500px]">
        <img src={hero}  alt="" />
        </div>
        
        
        <div className="flex flex-row absolute justify-center font-worksans text-white ">
          <p className="pr-[2rem]">Features</p>
          <p className="pr-[2rem] pl-[2rem]">Pricing</p>
          <p className="pl-[2rem]">Team</p>
        </div>
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
        <button className="m-4 p-4 bg-black text-white rounded-full" ><Link to="/login">JOIN BYTEBISTRO</Link></button>
        <button className="m-4 p-4 bg-[#B1E5F2] rounded-full">KNOW MORE</button>
        </div>
    </div>
    </>
  )
}

export default Landing;
