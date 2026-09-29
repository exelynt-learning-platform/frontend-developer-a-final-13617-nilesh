import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Modal } from '@src/utils/ui/modal';
import Button from '@src/utils/ui/button/Button';
import Input from '@src/components/form/input/InputField';
import Select from '@src/components/form/Select';
import Label from '@src/components/form/Label';
import { validateEmployeeForm } from '@src/validation/employeeValidation.js';
import { State, City, Country } from 'country-state-city';

const initialFormData = {
  name: '',
  email: '',
  mobile: '',
  country: '',
  state: '',
  district: '',
};

const getCountryCode = (countryName) => {
  if (!countryName) return '';

  const country = Country.getAllCountries().find(
    (item) => item.name.toLowerCase() === countryName.toLowerCase(),
  );

  return country?.isoCode || '';
};

const Employee = ({
  isOpen,
  onClose,
  onSubmit,
  countries = [],
  mode = 'add',
  employee = null,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleCountryChange = (countryName) => {
    const countryCode = getCountryCode(countryName);

    const countryStates = State.getStatesOfCountry(countryCode);

    setStates(countryStates);

    setDistricts([]);

    setFormData((prev) => ({
      ...prev,
      country: countryName,
      state: '',
      district: '',
    }));

    setErrors((prev) => ({
      ...prev,
      country: '',
      state: '',
      district: '',
    }));
  };

  const handleStateChange = (stateCode) => {
    const countryCode = getCountryCode(formData.country);

    const stateDistricts = City.getCitiesOfState(countryCode, stateCode);

    setDistricts(stateDistricts);

    setFormData((prev) => ({
      ...prev,
      state: stateCode,
      district: '',
    }));

    setErrors((prev) => ({
      ...prev,
      state: '',
      district: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateEmployeeForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit?.(formData);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setStates([]);
    setDistricts([]);
    setErrors({});

    onClose();
  };

  const countryOptions = [
    ...new Map(
      countries.map((country) => [
        country.country.toLowerCase(),
        {
          value: country.country,
          label: country.country,
        },
      ]),
    ).values(),
  ];

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const districtOptions = districts.map((district) => ({
    value: district.name,
    label: district.name,
  }));

  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'add') {
      setFormData(initialFormData);
      setStates([]);
      setDistricts([]);
      setErrors({});
      return;
    }

    if (mode === 'edit' && employee) {
      const countryName = employee.country || '';

      const countryCode = getCountryCode(countryName);

      const countryStates = State.getStatesOfCountry(countryCode);

      setStates(countryStates);

      const employeeState = employee.state || '';

      const selectedState = countryStates.find(
        (state) => state.isoCode.toLowerCase() === employeeState.toLowerCase(),
      );

      const stateCode = selectedState?.isoCode || '';

      const stateDistricts = stateCode
        ? City.getCitiesOfState(countryCode, stateCode)
        : [];

      setDistricts(stateDistricts);

      const selectedDistrict = stateDistricts.find(
        (district) =>
          district.name.toLowerCase() ===
          (employee.district || '').toLowerCase(),
      );

      setFormData({
        name: employee.name || '',
        email: employee.email || employee.emailId || '',
        mobile: employee.mobile || '',
        country: countryName,
        state: stateCode,
        district: selectedDistrict?.name || '',
      });

      setErrors({});
    }
  }, [isOpen, mode, employee]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-h-[90vh] max-w-[700px] overflow-y-auto"
    >
      <form onSubmit={handleSubmit}>
        {/* Header */}

        <header className="border-b border-gray-200 px-5 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            {mode === 'edit' ? 'Edit Employee' : 'Add Employee'}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {mode === 'edit'
              ? 'Update employee information.'
              : 'Add a new employee to the organization.'}
          </p>
        </header>

        {/* Form */}

        <section className="px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            {/* Name */}

            <div>
              <Label htmlFor="name">
                Name <span className="text-error-500">*</span>
              </Label>

              <Input
                id="name"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                maxLength={50}
                error={!!errors.name}
                hint={errors.name}
              />
            </div>

            {/* Email */}

            <div>
              <Label htmlFor="email">
                Email <span className="text-error-500">*</span>
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                maxLength={100}
                error={!!errors.email}
                hint={errors.email}
              />
            </div>

            {/* Mobile */}

            <div>
              <Label htmlFor="mobile">
                Mobile <span className="text-error-500">*</span>
              </Label>
              <PhoneInput
                international
                defaultCountry="IN"
                countryCallingCodeEditable={false}
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(value) => handleChange('mobile', value || '')}
                className={`phone-input ${
                  errors.mobile ? 'phone-input-error' : ''
                }`}
              />

              {errors.mobile && (
                <p className="mt-1.5 text-xs text-error-500">{errors.mobile}</p>
              )}
            </div>

            {/* Country */}

            <div>
              <Label htmlFor="country">
                Country <span className="text-error-500">*</span>
              </Label>

              <Select
                value={formData.country}
                onChange={handleCountryChange}
                options={countryOptions}
                placeholder="Select Country"
                error={!!errors.country}
              />

              {errors.country && (
                <p className="mt-1.5 text-xs text-error-500">
                  {errors.country}
                </p>
              )}
            </div>

            {/* State */}

            <div>
              <Label htmlFor="state">
                State <span className="text-error-500">*</span>
              </Label>

              <Select
                value={formData.state}
                onChange={handleStateChange}
                options={stateOptions}
                placeholder={
                  formData.country ? 'Select State' : 'Select Country First'
                }
                disabled={!formData.country}
                error={!!errors.state}
              />

              {errors.state && (
                <p className="mt-1.5 text-xs text-error-500">{errors.state}</p>
              )}
            </div>

            {/* District */}

            <div>
              <Label htmlFor="district">
                District <span className="text-error-500">*</span>
              </Label>

              <Select
                value={formData.district}
                onChange={(district) => handleChange('district', district)}
                options={districtOptions}
                placeholder={
                  formData.state ? 'Select District' : 'Select State First'
                }
                disabled={!formData.state}
                error={!!errors.district}
              />

              {errors.district && (
                <p className="mt-1.5 text-xs text-error-500">
                  {errors.district}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}

        <footer className="flex flex-col-reverse gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#354075] hover:bg-[#2c3565] sm:w-auto"
          >
            {loading ? 'Saving...' : mode === 'edit' ? 'Update' : 'Add'}
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default Employee;
