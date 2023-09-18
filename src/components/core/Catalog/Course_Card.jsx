import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
   
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="w-11/12  border-1 border-white ">

        <div className=' shadow-[10px_-5px_35px_-5px] shadow-black '>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-[320px] rounded-xl object-cover `}
            />
          </div>

          <div className="flex flex-col gap-2 px-1 ">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>

            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName} 
            </p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>

           
          </div>

          <div className="h-10 md:h-16 lg:h-7"></div >

        </div>

        </div>
      </Link>
    </>
  )
}

export default Course_Card