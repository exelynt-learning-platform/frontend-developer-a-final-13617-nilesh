export const validateEmployeeForm = (formData = {}) => {
  const errors = {};

  const name = String(formData.name ?? '').trim();
  const email = String(formData.email ?? '').trim();
  const mobile = String(formData.mobile ?? '').trim();
  const country = String(formData.country ?? '').trim();
  // const state = String(formData.state ?? '').trim();
  // const district = String(formData.district ?? '').trim();

  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 50) {
    errors.name = 'Name must not exceed 50 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  } else if (email.length > 100) {
    errors.email = 'Email must not exceed 100 characters';
  }

  if (!mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Mobile number must be 10 digits';
  }

  if (!country) {
    errors.country = 'Country is required';
  }

  // if (!state) {
  //   errors.state = 'State is required';
  // } else if (state.length > 50) {
  //   errors.state = 'State must not exceed 50 characters';
  // }

  // if (!district) {
  //   errors.district = 'District is required';
  // } else if (district.length > 50) {
  //   errors.district = 'District must not exceed 50 characters';
  // }

  return errors;
};
