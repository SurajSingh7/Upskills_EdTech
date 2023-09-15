import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Bar, Line, Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {


  const [currChart, setCurrChart] = useState("students")

  // Function -> generate random colors
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random()* 256)}, ${Math.floor( Math.random() * 256)}, 
      ${Math.floor(Math.random() * 256)})`;

      colors.push(color)
    }
    return colors
  }


  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      { 
        label:"Number Of Students",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth:1,
      },
    ],
  }
  
  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      { 
        label:"Amount Generated",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // Options for the bar
  const options = {
        scales: {
          y:{
            ticks:{
                stepSize:1
            }
          }

        },
   }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
     
      {/* part-1 */}
      <div className="space-x-4 font-semibold">

        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>

      </div>

      {/* part-2 */}
      <div className="relative mx-auto aspect-square h-full w-full">
       
        {/* Render the Pie chart based on the selected chart */}
          <Bar
             data={currChart === "students" ? chartDataStudents : chartIncomeData}
             options={options}
            //  height={400}
         />
        

      </div>

    </div>
  )
}