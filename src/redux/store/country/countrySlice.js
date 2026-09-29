import { createSlice } from '@reduxjs/toolkit';
import { fetchCountries } from './countryThunks';

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: 'country',

  initialState,

  reducers: {
    clearCountryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.countries = action.payload;
      })

      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch countries.';
      });
  },
});

export const { clearCountryError } = countrySlice.actions;

export default countrySlice.reducer;
