import React from 'react'

/**
 * RegisterInputs – "Are you an Agency?" radio component
 * Props:
 *   value    – 'yes' | 'no'
 *   onChange – change handler for the parent form state
 */
const RegisterInputs = ({ value, onChange }) => {
  return (
    <div>
      <p className="agency-label">
        Are you an Agency?<span className="req">*</span>
      </p>
      <div className="radio-row">
        <label className="radio-option">
          <input
            type="radio"
            name="isAgency"
            value="yes"
            checked={value === 'yes'}
            onChange={onChange}
          />
          Yes
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="isAgency"
            value="no"
            checked={value === 'no'}
            onChange={onChange}
          />
          No
        </label>
      </div>
    </div>
  )
}

export default RegisterInputs
