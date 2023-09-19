import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiConnector } from '../../../services/apiconnector';
import { categories } from '../../../services/apis';
import { getCatalogaPageData } from '../../../services/operations/pageAndComponentData';

import CourseSlider from '../Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from '../../../pages/Error';
import { FaArrowRight } from 'react-icons/fa';

 export const TopCourses = () => {

    const { loading } = useSelector((state) => state.profile)
    const catalogName="web-developement";
    const navbarFlag="ture";
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter( (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName )[0]._id;
            setCategoryId(category_id);
        }

        getCategories();
    },[]);

    // Fetch CategoryDetails 
    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId,navbarFlag);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

      if (!loading && !catalogPageData.success) {
        return <Error />
      }


  return (

    <>

          <div className=" mb-10 mx-auto box-content w-[97%]  px-4 py-0 -mt-5 lg:max-w-maxContent 
             shadow-[10px_-5px_35px_-5px] shadow-caribbeangreen-300
          ">
              <div className="text-center py-8 mx-7 section_heading"> Top Trending  courses  </div>

              <div className='mx-5'>
              <CourseSlider Courses={catalogPageData?.data?.mostSellingCourses?.slice(0,5)} />
              </div>


                {/* Button*/}
              <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
               <Link to={"/catalog/data-structures-&-algorithms"}>
                 <div className="  shadow-[1px_-2px_20px_-2px] shadow-caribbeangreen-100 group  mt-14 w-fit rounded-full bg-richblack-900 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                  <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                    <p>Explore Full Courses</p>
                    <FaArrowRight />
                  </div>
                 </div>
                </Link>
              </div>
        
               <div className='h-10'></div>

          </div>      
    </>
   
  )
}
