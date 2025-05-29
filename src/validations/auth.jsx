import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email_id: Yup.string()
    .email("Invalid email format")
    .required("Email is a required field")
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      "Email must follow the format: text@text.text"
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is a required field"),
});


export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  user_name: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),

  email_id: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^[6-9]\d{9}$/, 'Invalid phone number'),
});


export const forgetPasswordValidationSchema = Yup.object({
  email_id: Yup.string()
    .email("Invalid email format")
    .required("Email is a required field")
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      "Email must follow the format: text@text.text"
    )
});

export const OtpValidationSchema = Yup.object({
  otp: Yup.string()
    .required('Otp is required')
});