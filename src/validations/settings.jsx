import * as Yup from "yup";

export const basicDetailsValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  user_name: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),

  email_id: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),

  
  phone_number: Yup.string()
  .required('Phone number is required')
  .test('valid-indian-number', 'Invalid Indian phone number', (value) => {
    if (!value) return false;
    const number = value.replace(/^\+91/, ''); // strip +91
    return /^[6-9]\d{9}$/.test(number);
  }),

});


export const bankValidationSchema = Yup.object().shape({
  account_details: Yup.array().of(
    Yup.object().shape({
      account_number: Yup.number()
        .typeError("Account number must be a number")
        .required("Account number is required"),

      user_name: Yup.string()
        .required("Account Type is required"),

      ifsc_number: Yup.string()
        .required("IFSC Number is required"),

      bank_name: Yup.string()
        .required("Bank Name is required"),

      branch_name: Yup.string()
        .required("Branch Name is required"),
    })
  ),
});
