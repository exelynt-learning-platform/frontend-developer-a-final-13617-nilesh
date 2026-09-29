const Select = ({
  options,
  placeholder = 'Select an option',
  onChange,
  onBlur,
  className = '',
  value = '', // Use `value` prop directly
  disabled = false,
  placeholderDisabled = true,
  error = false,
}) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue); // Trigger parent handler
    }
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border ${
        error ? 'border-error-500' : 'border-gray-300'
      } bg-transparent px-4 py-2.5 pr-11 font-outfit text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none ${
        error
          ? 'focus:border-error-500 focus:ring focus:ring-error-500/10'
          : 'focus:border-brand-300 focus:ring focus:ring-brand-500/10'
      } dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        value
          ? 'text-gray-800 dark:text-white/90'
          : 'text-gray-400 dark:text-gray-400'
      } ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={disabled}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled={placeholderDisabled}
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
