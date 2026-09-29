import clsx from 'clsx'; // Install with: npm install clsx

const Checkbox = ({
  label,
  checked,
  id,
  onChange,
  className = '',
  disabled = false,
}) => {
  return (
    <label
      className={clsx(
        'flex items-center space-x-3 cursor-pointer text-gray-800 dark:text-gray-200',
        { 'cursor-not-allowed opacity-50': disabled }
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={clsx(
          'w-4 h-4 border-gray-300 rounded focus:ring-0 focus:ring-ag-green-700   ',
          'dark:bg-gray-700 dark:border-gray-600 dark:checked:border-gray-600dark: checked:border-ag-green-800',
          'focus:ring-offset-0 focus:outline-none text-ag-green-700 checked:bg-ag-green-700',
          className
        )}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && <span className="text-sm font-medium">{label}</span>}
    </label>
  );
};

export default Checkbox;
