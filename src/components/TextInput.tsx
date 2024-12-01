import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextInput: React.FC<InputProps> = ({ error, ...props }) => {
  return (
    <div className="w-full mb-6">
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-lg border-2 border-white bg-transparent text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500" : "border-white"} 
          transition-all duration-300`}
      />
      <p className="text-red-500 min-h-5 text-sm mt-1">{error}</p>
    </div>
  );
};
