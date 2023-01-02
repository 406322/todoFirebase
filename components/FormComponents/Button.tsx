

import React from 'react';

interface ButtonProps {
  type?: 'submit';
  variant ?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button = ({ 
  type, 
  variant,
  onClick, 
  ...rest 
}: ButtonProps) => {

  let style = '';
  if (variant === 'primary') {
    style = "w-48 py-2 text-sm font-medium text-white bg-blue-600 rounded-md h-11 px-46 hover:bg-blue-700"
  } else if (variant === 'secondary') {
    style = "text-sm text-blue-700 hover:underline dark:text-blue-500"
  }


  return (
    <button
      className={style}
      type={type}
      onClick={onClick}
      {...rest}
    >
    </button>
  );
};

