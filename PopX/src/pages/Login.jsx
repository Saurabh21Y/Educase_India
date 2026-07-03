import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input  from '../ui/Input'
import Button from '../ui/Button'

/**
 * Login – "Signin to your PopX account"
 * Validates against credentials saved in localStorage during Register.
 * Errors:
 *   - Empty fields
 *   - No account found (email doesn't match)
 *   - Wrong password
 */
export default function Login() {
  const navigate = useNavigate()

  const [form, setForm]         = useState({ email: '', password: '' })
  const [emailError, setEmailError]       = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [generalError, setGeneralError]   = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear errors as user types
    if (name === 'email')    setEmailError('')
    if (name === 'password') setPasswordError('')
    setGeneralError('')
  }

  const isValid = form.email.trim() && form.password.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    let hasError = false

    // ── Field-empty checks ──
    if (!form.email.trim()) {
      setEmailError('Email address is required')
      hasError = true
    }
    if (!form.password.trim()) {
      setPasswordError('Password is required')
      hasError = true
    }
    if (hasError) return

    // ── Read saved credentials from localStorage ──
    const stored = localStorage.getItem('popx_credentials')

    if (!stored) {
      // No account registered yet
      setGeneralError('No account found. Please create an account first.')
      return
    }

    const { email: savedEmail, password: savedPassword, fullname: savedFullname } = JSON.parse(stored)

    // ── Email check ──
    if (form.email.toLowerCase() !== savedEmail.toLowerCase()) {
      setEmailError('No account found with this email')
      return
    }

    // ── Password check ──
    if (form.password !== savedPassword) {
      setPasswordError('Incorrect password. Please try again.')
      return
    }

    // ── All valid → set session & navigate ──
    sessionStorage.setItem(
      'popx_user',
      JSON.stringify({ fullname: savedFullname, email: savedEmail })
    )
    navigate('/account')
  }

  return (
    <div className="phone-frame">
      <form className="form-page" onSubmit={handleSubmit}>
        <h1 className="page-title">
          Signin to your<br />PopX account
        </h1>
        <p className="page-subtitle">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={handleChange}
          error={emailError}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          error={passwordError}
        />

        {/* General error (e.g. no account registered) */}
        {generalError && (
          <p className="login-general-error">{generalError}</p>
        )}

        <Button
          text="Login"
          type="submit"
          bgColor={isValid ? '#6C25FF' : '#c5c5c5'}
          color="#FFFFFF"
        />
      </form>
    </div>
  )
}

