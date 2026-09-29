import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCountries } from '@src/service/countryService';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',

  async (_, { rejectWithValue }) => {
    try {
      const response = await getCountries();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch countries. Please try again.',
      );
    }
  },
);
