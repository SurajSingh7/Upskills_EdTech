import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import {logout} from "../../services/operations/authAPI"

import { NavbarLinks } from "../../data/navbar-links"
import { sidebarLinks } from "../../data/dashboard-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ConfirmationModal from "./ConfirmationModal"
 
export default function SmallScreenNavbar({handleCrossButton, isClose}) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)


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

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const logoutBtn = () => { 
    dispatch(logout(navigate));
    handleCrossButton();
  }

  const cancelBtn = () => { 
    setConfirmationModal(null)
    handleCrossButton();
  }





  // const Icon = Icons[iconName]

  return (
    <div
    className={`
      flex flex-col fixed right-0  top-[63px] h-[420px]        sm:h-[500px]   justify-center z-[1000] backdrop-blur-3xl 
      shadow-[10px_10px_25px_-20px] shadow-richblack-25  w-[100%] transition-all duration-200`}
  >
  
    <div className= {`flex flex-col  text-xl sm:text-2xl relative  w-[100%] h-[90%]  items-center gap-7`} >
           
    {/* Login user access */}
     {(token) &&
      <nav className="block " >
        <ul className="flex flex-col gap-y-3 justify-center text-basse text-center text-richblack-25" >
         
          {sidebarLinks.map((link) => (
           
            <li key={link?.id} onClick={handleCrossButton}>
              { link.name === "My Profile"  && token !== null ? (
                <Link to={link?.path}>
                  <div>     
                    <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                    >
                      {link?.name}
                    </p>
                  </div>
                  
                </Link>
                ) :
                (
                  token !== null && link?.type === user?.accountType && (
                  <Link to={link?.path}>
                    <div className= {`${link.name === "Enrolled Courses" ?
                       "-mt-6" :"" }`}>  
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        >
                          {link?.name}
                        </p>
                    </div>
                  </Link>
                  )
                )
              }

                

            </li>
          ))}

        <nav className="block ">
         <ul className={` ${token !== null && user?.accountType === ACCOUNT_TYPE.STUDENT ? "mt-0" : "-mt-10"  } flex flex-col gap-y-3 text-center justify-center  text-richblack-25 `}    >
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Courses" ? (
                <>
                  <div
                    className={`group relative   justify-center flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div 
                    
                    className=" invisible absolute left-[50%] top-[20%] z-[1000] flex w-[290%] 
                      translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-2
                      text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible
                      group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      onClick={handleCrossButton}
                      >
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%]
                          translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center ">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter(
                              (subLink) => subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Course Found</p>
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
                    }`}
                    onClick={handleCrossButton}
                  >
                    { (link.title!="Home") && link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
         </ul>
        </nav>

          <div className={` ${token !== null && user?.accountType === ACCOUNT_TYPE.STUDENT ? "mt-3" : "-mt-0" } w-[90%]  h-[1px] bg-richblack-500 `}></div>
          {
            token !== null && (
              <>
                <Link to="/dashboard/settings">
                  <button onClick={handleCrossButton}>
                    <div>
                      <p
                      className={`${
                        matchRoute("/dashboard/settings")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      >
                        Settings
                      </p>
                  </div>
                  </button>
                </Link>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "You will be logged out of your account.",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      // btn1Handler: () => dispatch(logout(navigate)),
                      btn1Handler: logoutBtn,
                      btn2Handler: cancelBtn,
                    
                    })
                  }
                >
                    Logout
                </button>

              </>
              )
          }
               
        </ul>
      </nav>
     }

    {/* Without login user access */}
     {(!token)&& <>

       <nav className="block">
        <ul className="flex flex-col gap-y-3 text-center text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Courses" ? (
                <>
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div 
                    
                    className="invisible absolute left-[50%] top-[20%] z-[1000] flex w-[290%] 
                      translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-2
                      text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible
                      group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      onClick={handleCrossButton}
                      >
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%]
                          translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center ">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter(
                              (subLink) => subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Course Found</p>
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
                    }`}
                    onClick={handleCrossButton}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
       </nav>

      <div className="items-center gap-y-3 flex flex-col">
       
        {token === null && (
          <Link to="/login">
            <button className="rounded-[8px] border-2  bg-richblack-800 border-caribbeangreen-300 px-[45px]  py-[7px]
                z-[1000]   text-richblack-100"
                onClick={handleCrossButton}>
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className="rounded-[8px] border-2  bg-richblack-800 border-caribbeangreen-300 
              z-[1000] px-[40px] py-[7px] text-richblack-100" 
              onClick={handleCrossButton}>
              Sign up
            </button>
          </Link>
        )}
        
      </div>
      
       </>
     }
     
    </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}  />}
    </div>
      
  )
}

