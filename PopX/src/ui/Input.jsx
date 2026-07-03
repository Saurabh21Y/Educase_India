import React from 'react'

/**
 * Floating-label Input — purple #6C25FF theme
 * Props:
 *   label       – visible label text (floats above border)
 *   placeholder – placeholder inside input
 *   type        – input type (default: 'text')
 *   name        – input name attribute
 *   value       – controlled value
 *   onChange    – change handler
 *   required    – show required asterisk on label
 *   error       – validation error string; turns border red + shows message
 */
const Input = ({
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  error = '',
}) => {
  return (
    <div className="input-wrapper">
      <label className={error ? 'label-error' : ''}>
        {label}
        {required && <span className="req">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={error ? 'input-error' : ''}
      />
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  )
}

export default Input
