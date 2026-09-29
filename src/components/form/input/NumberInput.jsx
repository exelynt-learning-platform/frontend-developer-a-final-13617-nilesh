import { Plus, Minus } from 'lucide-react';

export default function NumberInput({
  value,
  onChange,
  min = 0,
  onKeyDown,
  showButtons = true,
  max,
  disabled = false,
  className = '',
  placeholder = '',
}) {
  const handleIncrement = () => {
    const numValue = Number(value || 0);
    const newValue =
      max !== undefined ? Math.min(numValue + 1, max) : numValue + 1;
    onChange(String(Math.max(min, newValue)));
  };

  const handleDecrement = () => {
    const numValue = Number(value || 0);
    const newValue = Math.max(min, numValue - 1);
    onChange(String(newValue));
  };

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (val === '') {
      onChange('');
      return;
    }
    let numValue = Number(val);

    if (isNaN(numValue)) return;

    if (max !== undefined) {
      numValue = Math.min(numValue, max);
    }
    numValue = Math.max(min, numValue);
    onChange(String(numValue));
  };

  return (
    <div
      className={`flex items-center h-10 rounded-lg  border border-gray-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        onScroll={(e) => e.target.blur()}
        onWheel={(e) => e.target.blur()}
        onKeyDown={onKeyDown}
        disabled={disabled}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`flex-1 h-10 w-full ${showButtons ? 'rounded-l-lg' : 'rounded-lg'}   px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 focus:ring-4 
[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:cursor-not-allowed ${className}`}
      />
      {showButtons && (
        <>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled}
            className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors border-l border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Increment"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled}
            className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors border-l border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Decrement"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
}
