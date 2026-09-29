import { createSlice } from '@reduxjs/toolkit';

import {
  fetchEmployees,
  fetchEmployeeById,
  addEmployee,
  editEmployee,
  removeEmployee,
} from './employeeThunks';

const initialState = {
  employees: [],
  selectedEmployee: null,

  // Employee list
  loading: false,
  error: null,

  // Search
  searchResult: null,
  searchLoading: false,
  searchError: null,

  // Add / Edit / Delete
  mutationLoading: false,
  mutationError: null,
};

const employeeSlice = createSlice({
  name: 'employee',

  initialState,

  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
      state.searchResult = null;
      state.searchError = null;
    },

    clearEmployeeError: (state) => {
      state.error = null;
    },

    clearSearchError: (state) => {
      state.searchError = null;
    },

    clearMutationError: (state) => {
      state.mutationError = null;
    },
  },

  extraReducers: (builder) => {
    // GET ALL EMPLOYEES
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.employees = action.payload;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch employees.';
      });

    // GET EMPLOYEE BY ID
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchResult = null;
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchError = null;
        state.searchResult = action.payload;
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchResult = null;
        state.searchError = action.payload || 'Employee not found.';
      });

    // ADD EMPLOYEE
    builder
      .addCase(addEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = null;

        state.employees.push(action.payload);
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || 'Failed to add employee.';
      });

    // UPDATE EMPLOYEE
    builder
      .addCase(editEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })

      .addCase(editEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = null;

        const updatedEmployee = action.payload;

        const employeeIndex = state.employees.findIndex(
          (employee) => String(employee.id) === String(updatedEmployee.id),
        );

        if (employeeIndex !== -1) {
          state.employees[employeeIndex] = updatedEmployee;
        }

        if (String(state.selectedEmployee?.id) === String(updatedEmployee.id)) {
          state.selectedEmployee = updatedEmployee;
        }
      })

      .addCase(editEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || 'Failed to update employee.';
      });

    // DELETE EMPLOYEE
    builder
      .addCase(removeEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })

      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = null;

        const deletedId = action.payload;

        state.employees = state.employees.filter(
          (employee) => String(employee.id) !== String(deletedId),
        );

        if (String(state.selectedEmployee?.id) === String(deletedId)) {
          state.selectedEmployee = null;
        }
      })

      .addCase(removeEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || 'Failed to delete employee.';
      });
  },
});

export const {
  clearSelectedEmployee,
  clearEmployeeError,
  clearSearchError,
  clearMutationError,
} = employeeSlice.actions;

export default employeeSlice.reducer;
