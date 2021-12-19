import React from 'react';

function ToolTip({ children, tooltip }) {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-0">
        <div className="relative mx-2">
          <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
            {tooltip}
            <svg
              className="absolute text-black h-2 left-0 ml-3 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolTip;
