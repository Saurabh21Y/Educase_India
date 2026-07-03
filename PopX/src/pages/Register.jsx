import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input           from '../ui/Input'
import Button          from '../ui/Button'
import RegisterInputs  from '../components/RegisterInputs'

/**
 * Register – "Create your PopX account"
 * Fields: Full Name*, Phone*, Email*, Password*, Company Name
 *         + Agency radio (Yes/No)
 * On submit → saves user to sessionStorage → navigates to /account
 */
export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    phone:    '',
    email:    '',
    password: '',
    company:  '',
    isAgency: 'yes',
  })

  // Phone & Password validation states
  const [phoneError,    setPhoneError]    = useState('')
  const [passwordError, setPasswordError] = useState('')

  // ── Password rules ──
  const validatePassword = (val) => {
    if (val.length === 0)   return ''
    if (val.length < 6)     return 'Password must be at least 6 characters'
    const hasLetter = /[a-zA-Z]/.test(val)
    const hasNumber = /[0-9]/.test(val)
    if (!hasLetter) return 'Password must contain at least one letter'
    if (!hasNumber) return 'Password must contain at least one number'
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Phone: only allow digits, validate max 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      setForm((prev) => ({ ...prev, phone: digitsOnly }))
      setPhoneError(digitsOnly.length > 10 ? 'Only 10 digit ph no' : '')
      return
    }

    // Password: real-time validation
    if (name === 'password') {
      setForm((prev) => ({ ...prev, password: value }))
      setPasswordError(validatePassword(value))
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isValid =
    form.fullName.trim()     &&
    form.phone.trim()        &&
    form.phone.length <= 10  &&
    !phoneError              &&
    form.email.trim()        &&
    form.password.trim()     &&
    !passwordError           &&
    form.password.length >= 6

  const handleSubmit = (e) => {
    e.preventDefault()

    // ── Submit-time phone validation ──
    if (form.phone.length === 0) {
      setPhoneError('Phone number is required')
      return
    }
    if (form.phone.length !== 10) {
      setPhoneError(`Only 10 digit ph no (entered: ${form.phone.length})`)
      return
    }

    // ── Submit-time password validation ──
    const pwdErr = validatePassword(form.password)
    if (form.password.length === 0) {
      setPasswordError('Password is required')
      return
    }
    if (pwdErr) {
      setPasswordError(pwdErr)
      return
    }

    // ── Save credentials to localStorage for Login validation ──
    localStorage.setItem(
      'popx_credentials',
      JSON.stringify({
        email:    form.email,
        password: form.password,
        fullname: form.fullName,   // ← name bhi save karo
      })
    )

    // ── Save profile to sessionStorage for Account page ──
    sessionStorage.setItem(
      'popx_user',
      JSON.stringify({ fullname: form.fullName, email: form.email })
    )

    navigate('/account')
  }

  return (
    <div className="phone-frame">
      <form className="form-page" onSubmit={handleSubmit}>
        <h1 className="page-title">
          Create your<br />PopX account
        </h1>

        <Input
          label="Full Name"
          name="fullName"
          placeholder="Marry Doe"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="Enter 10-digit number"
          value={form.phone}
          onChange={handleChange}
          required
          error={phoneError}
        />
        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="Marry Doe"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Min 6 chars, letters & numbers"
          value={form.password}
          onChange={handleChange}
          required
          error={passwordError}
        />
        <Input
          label="Company name"
          name="company"
          placeholder="Marry Doe"
          value={form.company}
          onChange={handleChange}
        />

        {/* "Are you an Agency?" radio – lives in components/ */}
        <RegisterInputs value={form.isAgency} onChange={handleChange} />

        <div className="form-spacer" />

        <Button
          text="Create Account"
          type="submit"
          bgColor={isValid ? '#6C25FF' : '#c5c5c5'}
          color="#FFFFFF"
        />
      </form>
    </div>
  )
}
