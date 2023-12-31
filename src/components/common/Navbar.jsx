// 1.logo
// 2.home,(catalog->cond...),Aboutus,Contactus
// 3.Login,SingUp,ProfileDropdown,cart

import { useEffect, useRef,useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown ,BiMenuAltRight} from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logoFull from "../../assets/Logo/Logo-Full-Light.png"
import logo from "../../assets/Logo/Logo.png"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

import {ImCross} from "react-icons/im"
import SmallScreenNavbar from "./SmallScreenNavbar"
import SmallScreenBottonNavbar from "./SmallScreenBottomNavbar"



function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
     (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links suraj", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

    //For SmallScreen
    const handleCrossButton = () => { 
      isClose = isClose ? setIsClose(false) : setIsClose(true);  
      // smallScreen = smallScreen ? setSmallScreen(false) : setSmallScreen(true);
    }

  return (
    
  <>
     <div className="md:h-14 h-[63px]  bg-transparent"></div>  
    

    <div
      className={` flex-row md:flex h-[63px] md:h-[75px] items-center justify-center border-b-[1px] border-b-richblack-700
      fixed z-50 top-0 left-0 w-full 
      ${location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"} 
      ${location.pathname !== "/" ? " shadow-[10px_-5px_35px_-5px] shadow-blue-200 " : ""}
        transition-all duration-200 shadow-[10px_-5px_35px_-5px] shadow-blue-200 ` }
    >


      <div className="  mx-4  m-4 md:m-0 justify-between gap-x-1  sm:justify-center sm:gap-x-10 md:gap-x-0 flex w-11/12 max-w-maxContent items-center  md:justify-between ">
        
         {/* Logo */}
        <Link to="/" className="hidden md:block">
          <img src={logoFull} alt="Logo" width={165} height={35} loading="lazy"  />
        </Link>


          {/* For SmallScreen */}

          <Link to="/" className="flex relative md:hidden ">

               <div> <img src={logo}  width={27}  className=" text-transparent absolute" /> ......</div>
               <div><button className=" md:hidden text-white  text-base "> Upskills  </button></div>
         </Link>


        {/* Navigation links */}
        <nav className=" md:block">
          <ul className="flex  md:gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Courses" ? (
                  <>
                 
                    <div
                      className={`group relative flex  cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      
                    > 
                      <p>{link.title}</p>
                      <BsChevronDown />
          
                      <div className="invisible absolute left-[90%] md:left-[50%] top-[80%] md:top-[90%] z-[1000] flex w-[290px] md:w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5  p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[40%]  md:left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 "></div>
                        
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {

                            subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                  {console.log(subLink.name)}
                                </Link>
                              ))}

                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } hidden md:block `}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
 
        
        {/* Login / Signup / Dashboard */}
        <div className=" flex  items-center gap-x-3  md:gap-x-4 md:flex">

          {
         
        //red@@@@@@@@@@@@
         token && user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className=" text-2xl md:text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-caribbeangreen-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )
          
          }
          {token === null && (
            <Link to="/login">


              {/* for pc */}
              <button className="  hidden md:block rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                 Log in
              </button>
            
              {/* for mobile */}
              <button className="  text-sm px-[1px] py-[2px] rounded-[5px] border-2  border-caribbeangreen-300 bg-richblack-800 text-richblack-25 md:hidden ">
                Login
              </button>

            </Link>
          )}
          {token === null && (
            <Link to="/signup">
               
               {/* for pc */}
               <button className="  hidden md:block  rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
              </button>
             
              {/* for mobile */}
              <button className="  text-sm px-[1px] py-[2px] rounded-[5px] border-2  border-caribbeangreen-300 bg-richblack-800  text-richblack-25 md:hidden ">
                Signup
              </button>

            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        
      
        <button className="flex justify-center items-center0 md:hidden"
          onClick={handleCrossButton}
        >
           {(isClose)?<ImCross fontSize={24} fill="#AFB2BF" />: <AiOutlineMenu fontSize={24} fill="#AFB2BF" /> }
        </button>

       {isClose && <SmallScreenNavbar  isClose={isClose} handleCrossButton={handleCrossButton} />}
        {<SmallScreenBottonNavbar/>}
       
      </div>
    </div>

  </>

  )
}

export default Navbar;