import React from "react"

import banner from "../../assets/Images/signup.jpg"


const ContactBanner = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
     
      <img src={banner} alt="banner" loading="lazy" className=" shadow-[10px_-5px_45px_-5px] shadow-pink-200" />

    </div>
  )
}

export default ContactBanner;