import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '@src/redux/store/employee/employeeSlice';
import countryReducer from '@src/redux/store/country/countrySlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    country: countryReducer,
  },
});

export default store;
