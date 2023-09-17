import React from 'react'
import HighlightText from './HighLightText'
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from "react-type-animation";

export const BannerComp = () => {
  return (

 <div className='-mt-14'>

   <div className={`flex lg:flex-row my-20 justify-between flex-col-reverse md:flex-row  md:gap-1  lg:gap-5 gap-5  `}>


      {/* Section 1  */}
    <div className="w-[100%]  lg:w-[50%] flex flex-col gap-8   ">

     <div className='md:mt-20'>

       <div className=" text-3xl  md:text-4xl lg:text-5xl font-semibold my-5"> 
          Want To <HighlightText text={"Learn"} />
       </div>

        {/* TypeAnimation */}
       <div className="text-richblack-300 text-base font-bold w-[85%]  ">
                
        <div className={`text-xl md:text-2xl lg:text-3xl text-white   drop-shadow-xl `} >

         <TypeAnimation
           sequence={[
                 
                 'Coding 💞 ',
                 1500,

                 'Development 💞 ',
                 1500,

                 'Java 💞 ',
                 1500,

                 'Data Structures 💞 ',
                 1500,

                 'Algorithms 💞 ',
                 1500
             ]}
               speed={1}
               repeat={Infinity}
               cursor={true}
               wrapper="span"
              />
            </div>

        </div>

        <div className=" my-10 text-xl md:3xl lg:text-3xl font-bold  text-richblack-5">
            We make programming simple & easy to understand.
        </div>

       {/* Button*/}
        <Link to={"/signup"}>
          <div className="  shadow-[1px_-2px_20px_-2px] shadow-caribbeangreen-100 group  mt-14 w-fit rounded-full bg-richblack-900 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        </div>

    </div>


             {/* Section 2 */}
    <div className=" h-fit  flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%]  md:my-8 lg:my-0 lg:w-[620px] ">

      <div className=" codeblock3 absolute  invisible md:visible "></div>
      <img  src="https://www.thecodehelp.in/_next/image?url=https%3A%2F%2Fcdn.thecodehelp.in%2Fbzfszobhjsgbjk2xb2ha_275f4fb989.png&w=3840&q=75"/>

    </div>

  </div>

    </div>
  )
}
