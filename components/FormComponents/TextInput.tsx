import React from 'react';


interface InputProps {
    type: string;
    id: string;
    placeholder: string;
    autoComplete: string;
    register: FormMethods<Record<string, any>>['register'];
}

const Input: React.FC<InputProps> = ({ type, id, placeholder, autoComplete, register, ...rest }) => {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...register(id, { required: true })}
            className={`w-full p-3 text-sm text-gray-900 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            {...rest}
        />
    );
};

export default Input;
