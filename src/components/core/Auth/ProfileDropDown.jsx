
import { useRef, useState } from "react"
// import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

// import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const imgRef = useRef()
  const proRef = useRef()
  const iconRef = useRef()
  const iconChildRef = useRef()


  window.addEventListener("click",(e)=>{
     if(e.target!==imgRef.current && e.target!==proRef.current && e.target!==iconRef.current && e.target!==iconChildRef.current){
      setOpen(false);
     }
  })

  // useOnClickOutside(ref, () => setOpen(false))
   
  
    if (!user) return null
    // let userName="surajsingh";
    let userName=user.firstName;

    if(!(userName.length<=10)){
       userName=userName.substring(0,8)+".";
    }

  return (
    
      <button className="relative" >
        
      <div ref={proRef} onClick={() => setOpen(!open)} className="flex items-center gap-x-1 text-sm text-richblack-100 font-bold ">

        {`Hi ${userName}! `}

        <img
          src={user?.image}
          ref={imgRef} onClick={() => setOpen(!open)}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover "
        />

        {/* <div  className="text-sm text-richblack-100" > */}
          {/* <AiOutlineCaretDown className="text-sm text-richblack-100" ref={menuRef} onClick={() => setOpen(!open)}/> */}
      
          <svg ref={iconRef} onClick={() => setOpen(!open)} className="w-[12px] h-[12px] text-gray-800 text-sm text-richblack-100
             dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
             <path  ref={iconChildRef} onClick={() => setOpen(!open)} d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z"/>
          </svg>
 
        {/* </div> */}

       

      </div>
  

      {open && (
        <div
          // onClick={(e) => e.stopPropagation()}
          className="absolute top-[170%]  right-[-5%] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          
        >

          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[30px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[30px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>


        </div>
      )}
      
      </button>
  )
}