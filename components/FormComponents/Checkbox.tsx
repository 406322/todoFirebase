import React from 'react'

interface CheckboxProps {
    id: string
    onClick: () => void
}

export const Checkbox = ({id, onClick }: CheckboxProps) => {
  return (
    <input
    type="checkbox"
    id={id}
    onClick={onClick}
    className="text-blue-600 bg-gray-700 border-gray-300 rounded-sm"
/>
  )
}
