import { Search } from 'lucide-react';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search Employee',
  className = '',
}) => {
  return (
    <div
      className={`
        flex h-[40px] w-full max-w-[237px] items-center
        rounded-full
        border border-[#E5E7EB]
        bg-white px-4
        transition
        focus-within:border-[#354075]
        focus-within:ring-2
        focus-within:ring-[#354075]/20
        ${className}
      `}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          h-full
          w-full
          border-0
          bg-transparent
          text-[15px]
          font-normal
          text-[#1D2939]
          outline-none
          placeholder:text-[#8A8F9A]
          focus:border-0
          focus:outline-none
          focus:ring-0
        "
      />

      <Search
        size={19}
        strokeWidth={2}
        className="ml-2 shrink-0 text-[#5A636A]"
      />
    </div>
  );
};

export default SearchInput;
