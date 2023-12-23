import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../../validations/signupSchema"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userActions } from "../../redux/userSlice"
import { studentSignup } from "../../api/authenticationApi"

const StudentSignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [err, setErr] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  const submitData = async data => {
    try {
      const response = await studentSignup(data)
      console.log("running submit data===", response.email)
      if (response?.success) {
        dispatch(userActions.setEmail(response.email)) //TODO:
        navigate("/verify-otp")
      }
    } catch (error) {
      if (typeof error === "string") {
        setErr(error)
      } else {
        setErr("An unexpected error occurred...........")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <input
        type="text"
        {...register("firstname")}
        placeholder="First name"
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  "
      />
      {errors.firstname && (
        <span className="text-red-600 text-sm italic">
          *{errors.firstname.message}
        </span>
      )}
      <input
        type="text"
        {...register("lastname")}
        placeholder="Last name"
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mt-2"
      />
      {errors.lastname && (
        <span className="text-red-600 text-sm italic">
          *{errors.lastname.message}
        </span>
      )}
      <input
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mt-2"
        type="email"
        {...register("email")}
        placeholder="Email"
      />

      {errors.email && (
        <span className="text-red-600 text-sm italic">
          *{errors.email.message}
        </span>
      )}

      <input
        type="number"
        {...register("mobile", { valueAsNumber: true })}
        placeholder="Mobile"
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mt-2"
      />
      {errors.mobile && (
        <span className="text-red-600 text-sm italic">
          *{errors.mobile.message}
        </span>
      )}

      <input
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-600 text-sm italic">
          *{errors.password.message}
        </span>
      )}
      <input
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
        type="password"
        {...register("confirmpassword")}
        placeholder="Confirm password"
      />
      {errors.confirmpassword && (
        <span className="text-red-600 text-sm italic">
          *{errors.confirmpassword.message}
        </span>
      )}
      {err && (
        <p className="my-2 rounded-md border-2 border-red-950 bg-red-400 text-red-950 font-semibold px-3 pt-1">
          {err}
        </p>
      )}
      <button
        type="submit"
        className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
      >
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        <span className="ml-">Sign Up</span>
      </button>
    </form>
  )
}

export default StudentSignupForm
