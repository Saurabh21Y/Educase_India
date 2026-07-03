import React, { useEffect, useState } from 'react'

/* Camera icon SVG */
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
    <path d="M9 2 7.17 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
)

/* Initials avatar – uses first letters of each word in name */
function Avatar({ name }) {
  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'MD'
  return <div className="avatar-initials">{initials}</div>
}

/**
 * Account – "Account Settings"
 * Reads user data from sessionStorage (set during Login or Register).
 * Shows: avatar initials, name, email, bio paragraph.
 */
export default function Account() {
  const [user, setUser] = useState({
    fullname: 'Marry Doe',
    email:    'Marry@Gmail.Com',
  })

  useEffect(() => {
    const stored = sessionStorage.getItem('popx_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  return (
    <div className="phone-frame">
      <div className="account-page">

        {/* ── Header ── */}
        <div className="acct-header">
          <h2 className="acct-header-title">Account Settings</h2>
        </div>

        {/* ── Profile card ── */}
        <div className="acct-profile-card">
          <div className="acct-profile-row">
            <div className="avatar-wrap">
              <Avatar name={user.fullname} />
              <div className="avatar-cam">
                <CameraIcon />
              </div>
            </div>
            <div>
              <p className="acct-name">{user.fullname}</p>
              <p className="acct-email">{user.email}</p>
            </div>
          </div>

          <p className="acct-bio">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing
            Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
            Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>

        {/* Empty body space with dashed bottom border */}
        <div className="acct-body" />
      </div>
    </div>
  )
}
