const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")

const emailAdmin=process.env.AdminEmail;

const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

// * For mutiple at a time and without webHook
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  //Check if course contain something
  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Please Provide CourseId",
    });
  }

  let totalAmount = 0;

  // going to every course/Traversing
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      // Chekcing if course exist or not
      if (!course) {
        return res.json({
          success: false,
          message: "Could not find the course",
        });
      }

      //setting amount of course
      totalAmount = course.price;

      // validation if user have already have that course or not

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.json({
          success: false,
          message: "Student is alreay Enrolled",
        });
      }
    } catch (error) {
      console.log("Error while capturePayment in going to every course", error);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log("Error while capturePayment", error);
    return res.status(500).json({
      success: false,
      message: "Error while capturePayment" + error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  //get data from req
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  //Validation
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(401).json({
      success: false,
      message: "Payment failed because all fields are required",
    });
  }

  //Verification
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  // If verfication happens
  if (expectedSignature === razorpay_signature) {
    //Enrolled studen in course
    enrollStudents(courses, userId, res);

    //return res
    return res.status(200).json({
      success: true,
      message: "Payment Verfied",
    });
  }
};

//Enrolling studen
const enrollStudents = async (courses, userId, res) => {
  //validation
  if (!courses || !userId) {
    return res.status(401).json({
      success: false,
      message:
        "Failed while enrolledStudent in vergying payemnt all fields are required",
    });
  }

  //*Add Student in course in Enrooled Students
  //Traverse on evry course
  for (const courseId of courses) {
    //find the courses
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(401).json({
          success: false,
          message: "Course Not Found",
        });
      }

        //progress of a course
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId,
          completedVideos:[],
        })

      //Add CourseId in Student Courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress:courseProgress._id,
          },
        },
        { new: true }
      );

      if (!enrolledStudent) {
        return res.status(401).json({
          success: false,
          message: "User Not Found",
        });
      }

    

      // Sending Mail to user
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      // send to admin also
      const emailResponseAdmin = await mailSender(
         emailAdmin,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )


      console.log("Email sent successfully: ", emailResponse.response)

    } catch (error) {
      console.log(
        "Error while enrolling studen in course and vice versa",
        error
      );
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//sending mail after payment sucessfull
exports.sendPaymentSuccessEmail = async (req, res) => {
  //fecth data
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id; 

  //Validation
  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the details(Send Email)",
    });
  }

  try {
    //Find User
    const enrolledStudent = await User.findById(userId);

    //send Mail
    await mailSender(
      enrolledStudent.email,
      `Payment Recieved`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail of payment successfull", error)
    return res.status(500).json({
        success:false,
        message:"Could Not send Mail"
    })
  }
};

