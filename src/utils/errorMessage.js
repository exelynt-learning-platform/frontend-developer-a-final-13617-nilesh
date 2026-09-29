export const getSafeErrorMessage = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    error ||
    'Something went wrong. Please try again.';

  return String(message).trim().slice(0, 300);
};
