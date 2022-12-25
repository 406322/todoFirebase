import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface TextInputProps {
    fieldName: string;
    id: string;
    type: string;
    register: UseFormRegister<FieldValues>;
    errors: any;
    placeHolder?: string;
    isRequired: boolean;
    maximLength: number;
    minimLength: number;
}


export const TextInput = (
    { fieldName, id, type, register, errors, placeHolder, isRequired, maximLength, minimLength }: TextInputProps
) => {

    return (

        //Input field
        <div className="form-field">
            <input
                id={id}
                type={type}
                className={`w-full p-3 text-sm text-gray-900 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                placeholder={placeHolder} {...register(fieldName, {
                    required: {
                        value: isRequired,
                        message: "This field is required",
                    },
                    maxLength: {
                        value: maximLength,
                        message: `Value must be maximum ${maximLength}`,
                    },
                    minLength: {
                        value: minimLength,
                        message: `Value must be minimum ${minimLength}`,
                    },
                }
                )}
            />

            <p>{errors[fieldName] && errors[fieldName].message}</p>
        </div>
    );
};

export default TextInput;