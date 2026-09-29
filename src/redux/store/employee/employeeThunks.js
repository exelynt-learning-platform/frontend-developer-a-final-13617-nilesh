import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '@src/service/employeeService';

// GET ALL EMPLOYEES
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployees();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch employees. Please try again.',
      );
    }
  },
);

// GET EMPLOYEE BY ID
export const fetchEmployeeById = createAsyncThunk(
  'employee/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getEmployeeById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Unable to search employee. Please try again.',
      );
    }
  },
);

// CREATE EMPLOYEE
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createEmployee(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to add employee. Please try again.',
      );
    }
  },
);

// UPDATE EMPLOYEE
export const editEmployee = createAsyncThunk(
  'employee/editEmployee',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await updateEmployee(id, payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to update employee. Please try again.',
      );
    }
  },
);

// DELETE EMPLOYEE
export const removeEmployee = createAsyncThunk(
  'employee/removeEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await deleteEmployee(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to delete employee. Please try again.',
      );
    }
  },
);
