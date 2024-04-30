import * as yup from "yup";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,10}$/;

export const changePasswordSchema = yup.object({
  currentPassword: yup

    .string()
    .transform((value) => value.trim())
    .min(4),
  newPassword: yup

    .string()
    .transform((value) => value.trim())
    .min(4, "Password should be at least 4 characters long")
    .matches(passwordRegex, "Password should contain letters and numbers"),
  confirmPassword: yup

    .string()
    .transform((value) => value.trim())
    .min(4, "Password should be at least 4 characters long")
    .matches(passwordRegex, "Password should contain letters and numbers")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});
