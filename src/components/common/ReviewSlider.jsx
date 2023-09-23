
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './ReviewSlider.css';
import { Autoplay, Pagination } from 'swiper/modules';


import ReactStars from "react-rating-stars-component"
// Icons
import { FaStar,FaQuoteLeft,FaQuoteRight } from "react-icons/fa"


// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {

  const [reviews, setReviews] = useState([])
  const LimitOfWords = 27;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])



  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' +  + '</span>';
    },
  };

  return (

      
     
      
    
    <div className="text-white w-full shadow-[1px_-2px_20px_-2px] shadow-caribbeangreen-100 md:flex  lg:flex-col md:justify-end">
      
     
      <div className="h-5"></div>
      <h1 className="text-center text-4xl font-semibold visible md:invisible lg:visible"> Reviews from other learners</h1>
    
      <div className="  my-[50px] h-[180px] max-w-maxContentTab  lg:max-w-maxContent ">

      <div className="h-0 md:h-16 lg:h-7 invisible md:visible lg:invisible " >
         <h1 className="  text-center text-4xl font-semibold -my-9"> Reviews from other learners</h1>
      </div>

        <Swiper
           slidesPerView={1}
           pagination={pagination}
           modules={[Pagination,Autoplay]}
           spaceBetween={15}
           rewind={true}
           autoplay={{
             delay: 2500,
             disableOnInteraction: false,
           }}
           breakpoints={{
             1024: {
               slidesPerView: 3,
             },
             624: {
              slidesPerView: 2,
            },
           }}

        > 
          {/* Todo -> For All rating in later */}
          {reviews.slice(0,20).map((review, i) => {
            return (
              <SwiperSlide key={i} > 

                <div className=" w-11/12   mx-3 flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">

                    {/* image ,name & courseName */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                    
                    {/* review */}
                  <p className="h-[4rem] font-medium text-richblack-25">
                
                   {/* <FaQuoteLeft/> */}
                    {review?.review.split(" ").length > LimitOfWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, LimitOfWords)
                          .join(" ")}  ...`
                      : `${review?.review}`}
                         {/* <FaQuoteRight/> */}
                  </p>
                 
                    {/* Rating */}
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100"> {review.rating.toFixed(1)}</h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                  
                
          
                </div>

                {/* <div className=""></div> */}
  
              </SwiperSlide>
            )
          })}

        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider;