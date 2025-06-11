import * as Yup from "yup";

export const budgetValidationSchema = Yup.object({
  category: Yup.string()
    .required("Category is a required field"),
  amount: Yup.string()
    .required("Amount is a required field"),
});
