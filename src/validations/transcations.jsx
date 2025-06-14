import * as Yup from "yup";

export const transationsValidationSchema = Yup.object({
  category: Yup.string().required("Category is a required field"),

  item:Yup.string().required('Item is a required field'),
  
  type: Yup.string().required("Type is a required field"),

  amount: Yup.number().required("Amount is a required field"),

  date: Yup.date()
    .required("Date is a required field")
    .max(new Date(), "Date cannot be in the future")
    .typeError("Please enter a valid date"),
});
