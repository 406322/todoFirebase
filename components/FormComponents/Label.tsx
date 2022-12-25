import React from 'react';

interface LabelProps {
  htmlFor: string;
  label: string;
}

export const Label = ({ htmlFor, label }: LabelProps) => {
  return (
    <label className="text-sm text-gray-200" htmlFor={htmlFor}>{label}</label>
  );
};
