import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"
import ReviewSlider from '../components/common/ReviewSlider';

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const { catalogName } = useParams()
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
    },[catalogName]);

    // Fetch CategoryDetails 
    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
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
        
        

       

           {/*  Section-> Full Route Path , name , description part*/}
           <div className="  box-content bg-richblack-800 px-4">
            <div className="mx-7 flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Courses / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
 

          {/* Section 1  */}
          <div className=" mx-auto box-content w-[97%]  px-4 mb-5  lg:max-w-maxContent ">
              <div className=" py-5 mx-7 section_heading"> 

              <div className="section_heading ">Courses to get you started </div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                  <p className="border-b border-b-yellow-25 text-yellow-25">
                   {catalogPageData?.data?.selectedCategory?.name}
                   </p>
                </div>
              </div>

              <div className='mx-5'>
              <CourseSlider  Courses={catalogPageData?.data?.selectedCategory?.courses} />
              </div>

          </div>



             {/* Section 2  */}
          <div className=" mx-auto box-content w-[97%]  px-4 py-10 lg:max-w-maxContent ">
              <div className=" py-5 mx-7 section_heading">Top courses in {catalogPageData?.data?.differentCategory?.name}</div>

              <div className='mx-5'>
              <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
              </div>

          </div>


             {/* Section 3  */}
          <div className=" mx-auto box-content w-[97%]  px-4 py-8 lg:max-w-maxContent  ">
              <div className=" py-5 mx-7 section_heading"> Top Trending  courses </div>

              <div className='mx-5'>
              <CourseSlider Courses={catalogPageData?.data?.mostSellingCourses?.slice(0,5)} />
              </div>

          </div>

        
          <div className=' py-10 m-10'> <ReviewSlider /> </div> 
          

          <Footer />
        </>
      )
    }
    
    export default Catalog;