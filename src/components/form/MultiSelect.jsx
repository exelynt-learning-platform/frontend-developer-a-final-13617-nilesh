import { useEffect, useRef, useState } from 'react';

const MultiSelect = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
  className = '',
}) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedOptions(defaultSelected);
  }, [defaultSelected]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    const updated = selectedOptions.includes(value)
      ? selectedOptions.filter((v) => v !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updated);
    onChange?.(updated);
  };

  const removeOption = (value) => {
    const updated = selectedOptions.filter((v) => v !== value);
    setSelectedOptions(updated);
    onChange?.(updated);
  };

  const selectedLabels = selectedOptions?.map(
    (value) => options.find((opt) => opt.value === value)?.label || ''
  );

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative w-full">
        {/* INPUT BOX */}

        <div
          onClick={toggleDropdown}
          className={`flex min-h-12 max-h-20 cursor-pointer flex-wrap gap-2 items-center rounded-lg border border-gray-300 px-3 py-1.5 overflow-y-auto ${className}`}
        >
          {selectedLabels.length > 0 ? (
            selectedLabels.map((lbl, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2 py-1 text-xs"
              >
                {lbl}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(selectedOptions[i]);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">Select option</span>
          )}

          <svg
            className={`ml-auto h-5 w-5 transition ${
              isOpen ? 'rotate-180' : ''
            } text-gray-700`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* DROPDOWN */}

        {isOpen && (
          <div className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow">
            {options.length > 0 ? (
              options.map((opt) => (
                <div
                  key={opt.value}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                    selectedOptions.includes(opt.value)
                      ? 'bg-gray-100 font-medium'
                      : ''
                  }`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">No options</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
