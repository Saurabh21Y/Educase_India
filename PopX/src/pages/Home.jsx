import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

/**
 * Home – Welcome to PopX (Landing page)
 * Routes:
 *   "Create Account"          → /create-account
 *   "Already Registered? Login" → /login
 */
export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="phone-frame">
      <div className="home-page">
        {/* Content sits at the bottom of the 812px frame */}
        <div className="home-content">
          <h1 className="home-title">Welcome to PopX</h1>
          <p className="home-subtitle">
            Lorem ipsum dolor sit amet,<br />
            consectetur adipiscing elit,
          </p>
        </div>

        <div className="home-buttons">
          {/* Primary – purple #6C25FF */}
          <Button
            text="Create Account"
            className="btn-primary"
            onClick={() => navigate('/create-account')}
          />

          {/* Secondary – semi-transparent purple #6C25FF4B */}
          <Button
            text="Already Registered? Login"
            className="btn-secondary"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </div>
  )
}
