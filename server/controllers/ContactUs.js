const { BiLogoGmail } = require("react-icons/bi")
const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const emailAdmin=process.env.AdminEmail;

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {

    //  For user 
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    
    // For admin
    const AdminEmailRes = await mailSender(
      emailAdmin,
      "New user from Contactus page(Upskills)",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}