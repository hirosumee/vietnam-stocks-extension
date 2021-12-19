import React from 'react';

function AlertError(props) {
  if (!props.description) return <></>;
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mb-2"
      role="alert"
    >
      <strong className="font-bold">Somethings wrong!</strong>
      <span className="block sm:inline">{props.description}</span>
    </div>
  );
}

export default AlertError;
