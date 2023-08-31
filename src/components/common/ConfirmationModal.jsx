import IconBtn from "./IconBtn"

// #Modal
// 1.big div- blur
// 2. div- richblack
// 3. text-1
// 4. text-2
// 5. div(btn-1, btn-2)
 

export default function ConfirmationModal({ modalData }) {
  return (

    // 1.big div- blur
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

      {/* 2. div- richblack */}
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        
      {/* 3. text-1 */}
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>

        {/* 4. text-2  */}
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>

        <div className="flex items-center gap-x-4">

            {/* btn-1 */}
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          {/* btn-2 normal */}
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>

        </div>
        
      </div>

    </div>
  )
}