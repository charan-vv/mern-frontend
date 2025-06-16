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