import apiClient from '@src/utils/axiosConfig';
import { API_ENDPOINTS } from '@src/constants/apiEndpoints';

// Get all employees
export const getEmployees = () => {
  return apiClient.get(API_ENDPOINTS.EMPLOYEE);
};

// Get employee by ID
export const getEmployeeById = (id) => {
  return apiClient.get(`${API_ENDPOINTS.EMPLOYEE}/${id}`);
};

// Create employee
export const createEmployee = (payload) => {
  return apiClient.post(API_ENDPOINTS.EMPLOYEE, payload);
};

// Update employee
export const updateEmployee = (id, payload) => {
  return apiClient.put(`${API_ENDPOINTS.EMPLOYEE}/${id}`, payload);
};

// Delete employee
export const deleteEmployee = (id) => {
  return apiClient.delete(`${API_ENDPOINTS.EMPLOYEE}/${id}`);
};
