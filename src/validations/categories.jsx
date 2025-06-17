import * as Yup from "yup";

export const categoriesValidationSchema = Yup.object({
  category_name: Yup.string()
    .required("Category is a required field"),
});
