import * as yup from "yup";

export const profileUpdateSchema = yup.object({
  fname: yup.string().transform(value => value.trim()),
  lname: yup.string().transform(value => value.trim()),
  mob: yup.string().min(10).transform(value => value.trim()),
});
