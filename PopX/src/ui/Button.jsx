import React from 'react'

/**
 * Reusable Button
 * Props:
 *   text      – button label
 *   onClick   – click handler
 *   bgColor   – background hex (optional, falls back to className)
 *   color     – text hex (optional)
 *   type      – 'button' | 'submit' (default: 'button')
 *   className – extra class string
 */
const Button = ({
  text,
  onClick,
  bgColor,
  color,
  type = 'button',
  className = 'btn-primary',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(color  && { color }),
      }}
    >
      {text}
    </button>
  )
}

export default Button
