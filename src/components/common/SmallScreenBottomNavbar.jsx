import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import {logout} from "../../services/operations/authAPI"
import * as Icons from "react-icons/vsc"
import { VscSettingsGear } from "react-icons/vsc"

import { NavbarLinks } from "../../data/navbar-links"
import { sidebarLinks } from "../../data/dashboard-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ConfirmationModal from "./ConfirmationModal"
 
export default function SmallScreenBottomNavbar({handleCrossButton, isClose}) {
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


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

//  transition-all duration-200 backdrop-blur-xl 
return (
     <>

    { (token) &&
    <div
       className={` flex flex-col fixed right-0  bottom-0 h-[50px] md:hidden  justify-center z-[1000]  bg-white  w-[100%] `}
      >
  
     <div className= {`flex flex-row-reverse justify-between  mx-4 sm:justify-center sm:gap-10 items-center `} >
 
        {(token) &&
          <>
          { sidebarLinks.map((link) => (
            <>
              { (link.name == "My Profile" || link.name == "Settings" )? (
                <Link to={link?.path}>
                  <div key={link?.id}>  

                    <p className={`${ matchRoute(link?.path) ? "text-yellow-200": "text-richblack-600" }`}>
                     
                      <div className=" font-semibold">
                         <div className="flex justify-center  h-[20px]">{ Icons[link.icon]()}</div>
                         <div  className="text-[9px]">{link.name}</div>
                      </div>

                    </p>
                  </div>
                </Link>
                ) :
                (
                   link?.type === user?.accountType && (
                  <Link to={link?.path} >
                    <div key={link?.id} >  
                      <p className={`${ matchRoute(link?.path) ? "text-yellow-200" : "text-richblack-700" }`} >

                         <div className="font-semibold ">
                            <div className="flex justify-center h-[20p x]">{Icons[link.icon]()}</div>
                            <div className="text-[9px]">{link.name}</div>
                         </div>
                            
                        </p>
                    </div>
                  </Link>
                  )
                )
              }   
            </>
          )) }

            {/* For Settings */}
          <Link to="/dashboard/settings">
                    <div>
                      <p  className={`${ matchRoute("/dashboard/settings") ? "text-yellow-200" : "text-richblack-700" }`} >
                       
                        <div className=" font-semibold">
                            <div className="flex justify-center  h-[20px]">{ <VscSettingsGear/> }</div>
                            <div className="text-[9px]"> Settings </div>
                         </div>

                      </p>
                  </div>
          </Link>      
         </>
        }
                                                      
     
      </div>

    </div>  
     }

    </>
  )
}

