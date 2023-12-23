import { z } from "zod"

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,10}$/

export const schema = z
  .object({
    firstname: z
      .string()
      .max(30)
      .refine(value => value.trim() !== "", {
        message: "First name should not be empty"
      }),
    lastname: z
      .string()
      .max(30)
      .refine(value => value.trim() !== "", {
        message: "Last name should not be empty"
      }),
    email: z.string().email(),
    mobile: z
      .number()
      .min(1000000000, "Mobile should be 10 digits")
      .max(9999999999, "Mobile should be 10 digits"),
    password: z
      .string()
      .min(4)
      .refine(value => passwordRegex.test(value), {
        message: "Password should contain letters and numbers"
      }),
    confirmpassword: z
      .string()
      .min(4)
      .refine(value => passwordRegex.test(value), {
        message: "Password should contain letters and numbers"
      })
  })
  .refine(data => data.password === data.confirmpassword, {
    message: "Password does not match",
    path: ["confirmpassword"]
  })
