import React from 'react'
import Course_Card from './Course_Card'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './CourseSlider.css';


import { Autoplay, Pagination } from 'swiper/modules';


const CourseSlider = ({Courses}) => {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };


  return (
    <>
      {Courses?.length ? (

        <Swiper
         pagination={pagination}
         modules={[Pagination,Autoplay]}
         spaceBetween={35}
         rewind={true}
         navigation={true}
         autoplay={{
           delay: 3000,
          //  disableOnInteraction: false,
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

          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[180px]"} />
            </SwiperSlide>
          ))}


        </Swiper>

      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider;