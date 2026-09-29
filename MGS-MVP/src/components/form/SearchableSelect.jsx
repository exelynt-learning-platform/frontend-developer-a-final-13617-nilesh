import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import Input from '@src/components/form/input/InputField';

export default function SearchableSelect({
  value,
  options = [],
  placeholder = 'Select',
  onChange,
  width = 'w-full',
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update position when opened
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClick = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedLabel =
    options.find((opt) => String(opt.value) === String(value))?.label ||
    placeholder;

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={`relative ${width}`}>
        {/* BUTTON */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="h-10 w-full px-3 border border-gray-300 bg-white rounded-lg flex items-center justify-between text-sm"
        >
          <span className={value ? 'text-black' : 'text-gray-500'}>
            {selectedLabel}
          </span>
          <FiChevronDown />
        </button>
      </div>

      {/* DROPDOWN PORTAL */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              zIndex: 9999,
            }}
            className="bg-white border rounded-xl shadow-lg"
          >
            {/* SEARCH INPUT */}
            <div className="p-2 border-b">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* LIST */}
            <div className="max-h-40 overflow-y-auto text-sm">
              {filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch('');
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {opt.label}
                </div>
              ))}

              {filteredOptions.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No results
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
