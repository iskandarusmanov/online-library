import React from "react";
import { forwardRef } from "react";

function Input({ type, placeholder, className, onChange, ...restProps }, ref) {
  return (
    <div>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 w-[500px] p-4 rounded-[6px] mt-[5px] h-[40px] focus:outline-none focus:border-blue-600 ${className}`}
        {...restProps}
      />
    </div>
  );
}

export default forwardRef(Input);


