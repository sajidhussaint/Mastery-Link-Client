import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../validations/loginSchema"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { adminActions } from "../../redux/adminSlice"
import { adminLogin } from "../../api/authenticationApi"


const AdminLoginForm = () => {
  const [err, setErr] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const submitData = async data => {
    setErr("")
    try {
      const response = await adminLogin(data)
      if (response) {
        dispatch(adminActions.saveAdmin(response))
        navigate("/admin/dashboard")
      }
    } catch (error) {
        if (typeof error === "string") {
            setErr(error);
          } else {
            setErr("An unexpected error occurred.........");
          }
    }
  }

  return (
    <form action="" onSubmit={handleSubmit(submitData)}>
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
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
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-600 text-sm italic">
          *{errors.password.message}
        </span>
      )}
      {err && (
        <p className="my-2 rounded-md border-2 border-red-950 bg-red-400 text-red-950 font-semibold px-3 pt-1">
          {err}
        </p>
      )}
      <button type="submit" className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none text-white" >
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
        <span className="ml-">Sign In</span>
      </button>
    </form>
  )
}

export default AdminLoginForm
