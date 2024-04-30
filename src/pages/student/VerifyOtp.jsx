import React from "react"
import OtpVerificationForm from "../../components/auth/OtpVerificationForm"

const VerifyOtp = props => {
  return (
    <div>
      <OtpVerificationForm isInstructor={props.isInstructor} />
    </div>
  )
}

export default VerifyOtp
