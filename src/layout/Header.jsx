import React from 'react';

const Header = () => {
  return (
    <header className="flex h-[82px] w-full items-center justify-end rounded-xl bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          <span className="text-sm font-medium text-gray-700">NW</span>
        </div>

        <div className="hidden p-3 border-2 rounded-2xl text-left sm:block">
          <p className="text-sm font-outfit font-medium leading-5 text-gray-900">
            Nilesh Wankhede
          </p>

          <p className="text-xs leading-4 text-gray-500">CEO</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
