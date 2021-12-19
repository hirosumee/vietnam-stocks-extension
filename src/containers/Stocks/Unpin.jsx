import React from 'react';

function Unpin(props) {
  return (
    <div
      className="font-bold text-sm text-fuchsia-400 cursor-pointer"
      {...props}
    >
      <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    </div>
  );
}

export default Unpin;
