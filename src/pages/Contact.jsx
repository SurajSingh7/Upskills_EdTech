import React from "react"

import Footer from "../components/common/Footer"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactBanner from "../components/ContactPage/ContactBanner"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        
        {/* Contact Details */}
        <div className="lg:w-[40%]">  <ContactBanner /> </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]"> <ContactForm /> </div>

      </div>


        <div className="h-28"></div>
         {/* <ReviewSlider /> */}
          <ReviewSlider />

         <div className="h-24"></div>
          {/* <Footer /> */}
          <Footer />

    </div>
  )
}

export default Contact;