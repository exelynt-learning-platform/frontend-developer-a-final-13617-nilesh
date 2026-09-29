import { isValidPhoneNumber } from 'react-phone-number-input';

export const validateEmployeeForm = (formData) => {
  const errors = {};

  const name = formData.name.trim();
  const email = formData.email.trim();
  const mobile = formData.mobile.trim();

  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 55) {
    errors.name = 'Name must not exceed 55 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  } else if (email.length > 100) {
    errors.email = 'Email must not exceed 100 characters';
  }

  if (!formData.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!isValidPhoneNumber(formData.mobile)) {
    errors.mobile = 'Enter a valid mobile number';
  }

  if (!formData.country) {
    errors.country = 'Country is required';
  }

  // if (!formData.state) {
  //   errors.state = 'State is required';
  // }

  // if (!formData.district) {
  //   errors.district = 'District is required';
  // }

  return errors;
};
