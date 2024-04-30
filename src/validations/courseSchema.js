import * as yup from "yup";

export const courseSchema = yup
  .object({
    name: yup
      .string()
      .min(5, "Name should be minimum 5 letters")
      .transform((value) => value.trim()),
    description: yup
      .string()
      .min(5, "Description should be minimum 5 letters"),
    price: yup.number().min(1, "Price should be greater than zero"),
    category: yup
      .string()
      .transform((value) => value.trim()),
    instructor: yup
      .string()
      .transform((value) => value.trim()),
    language: yup
      .string()
      .transform((value) => value.trim()),
    level: yup
      .string()
      .transform((value) => value.trim()),
  })
  .required();
