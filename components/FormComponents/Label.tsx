import React from 'react';

interface LabelProps {
  htmlFor: string;
  label: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, label }) => {
  return (
    <label className="text-sm text-gray-200" htmlFor={htmlFor}>{label}</label>
  );
};
