import apiClient from '@src/utils/axiosConfig';

import { API_ENDPOINTS } from '@src/constants/apiEndpoints';

export const getCountries = () => {
  return apiClient.get(API_ENDPOINTS.COUNTRY);
};
