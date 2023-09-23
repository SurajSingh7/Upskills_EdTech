import React from "react";
import { Link } from "react-router-dom";

// Images
import logo from "../../assets/Logo/Logo-Full-Light.png";


const Footer = () => {
  return (

  <footer class="relative min-h-[280px] w-full overflow-hidden bg-richblack-800 text-[#e8e6e3] py-8 px-8 font-rubik">

  
   <div class="max-w-maxScreen mx-auto">
    
      <div class=" flex flex-col items-center md:items-start gap-4 md:flex-row md:justify-around md:gap-0 my-6">

      {/* part-1 logo */}
      <div class="flex flex-col text-center text-base md:text-left">

        <div className="flex justify-center md:flex-col md:-mx-5 ">
           <Link to="/"> <img className=" " src={logo} alt="Logo"  width={170} loading="lazy" /> </Link>
        </div>
          <p class="mt-3 text-base max-w-[300px]">The Ultimate Guide To Ace SDE Interviews.Join us!</p>
    
      </div>
   
       {/* part-2 menu */}
      <div class="flex flex-col text-center text-base md:text-left">
           <p class="mb-2 md:mb-6 font-bold uppercase text-center md:text-left">menu</p>

           <div class="flex flex-col gap-y-2">
              <Link to="/about">About Us</Link>
              <Link to="/catalog/data-structures-&-algorithms">Courses</Link>
              <Link to="/contact">Contact</Link>
           </div>
   
      </div>

      <div class="hidden w-[50px] bg-brColor md:block h-10"></div>
      {/* part-3 services */}
      <div class="flex flex-col text-center text-base md:text-left">
   
          <p class="mb-2 md:mb-6 font-bold uppercase text-center md:text-left">services</p>
          <div class="flex flex-col gap-y-2">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of use</Link>
          <Link to="/refund-and-cancellation-policy">Refund &amp; Cancellation Policy</Link>
     </div>

      </div>

      <div class="hidden h-[190px] w-[1px] bg-brColor md:block"></div>

      {/* part-4 get touch */}
      <div class="flex flex-col text-center text-base md:text-left">
        <p class="mb-2 md:mb-6 font-bold uppercase text-center md:text-left">GET IN TOUCH</p>
        <p>Email: <a href="mailto:220suraj@gmail.com">220suraj@gmail.com</a></p>
      </div>
 
      </div>
      
      {/* copyright */}
      <div class="mt-4  text-base text-center border-t border-brColor pt-5 "> 
         Copyright © 2023 Upskills | Created  By Suraj Singh
      </div>

      <div className="h-12 md:hidden"></div>
   
   </div>


   </footer>
    

  );
};

export default Footer;