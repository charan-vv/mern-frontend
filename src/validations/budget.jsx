import * as Yup from "yup";

export const budgetValidationSchema = Yup.object({
  cateogory: Yup.string()
    .required("Password is a required field"),
  amount: Yup.string()
    .required("Password is a required field"),
});
