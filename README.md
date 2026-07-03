# PopX — Educase India Assignment

A fully functional React application built as a recruitment assignment for **Educase India**. The app simulates a mobile onboarding flow for a platform called **PopX**, including registration, login with credential validation, and an account settings screen.

---

## 🚀 Live Preview

> Run locally using `npm run dev` inside the `PopX/` folder.
> Opens at: `http://localhost:5173`

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.7 | UI Framework |
| React Router DOM | ^6.26.1 | Client-side routing |
| Vite | ^8.1.1 | Build tool & dev server |
| ESLint | ^10.6.0 | Code linting |
| Google Fonts (Rubik) | — | Typography |
| localStorage | Browser API | Frontend credential persistence |
| sessionStorage | Browser API | Active session user data |

---

## 📁 Project Structure

```
PopX/
├── index.html                        ← HTML entry point (loads Rubik font)
├── vite.config.js                    ← Vite + React plugin config
├── package.json
└── src/
    ├── main.jsx                      ← React entry point (RouterProvider)
    ├── index.css                     ← Global styles, design tokens, all components
    ├── App.css                       ← Minimal root override
    │
    ├── routes/
    │   └── AppRoutes.jsx             ← All 4 routes via createBrowserRouter
    │
    ├── pages/
    │   ├── Home.jsx                  ← Landing page "Welcome to PopX"
    │   ├── Register.jsx              ← Create account form
    │   ├── Login.jsx                 ← Sign in with validation
    │   └── Account.jsx               ← Account settings page
    │
    ├── components/
    │   └── RegisterInputs.jsx        ← "Are you an Agency?" radio component
    │
    └── ui/
        ├── Button.jsx                ← Reusable button (configurable color props)
        └── Input.jsx                 ← Floating-label input with error state
```

---

## 🗺️ App Flow & Routing

```
/ (Home — Welcome to PopX)
 │
 ├── "Create Account" ──────────────► /create-account (Register)
 │                                            │
 │                                            └── on submit ──► /account
 │
 └── "Already Registered? Login" ──► /login
                                          │
                                          └── on success ──► /account
```

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing page with 2 CTA buttons |
| `/create-account` | `Register.jsx` | Full registration form |
| `/login` | `Login.jsx` | Sign in with credential check |
| `/account` | `Account.jsx` | Account settings with user profile |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#F7F8F9` | Page & input background |
| Primary Purple | `#6C25FF` | Buttons, labels, avatar, radio |
| Semi Purple | `rgba(108,37,255,0.29)` | Secondary button (`#6C25FF4B`) |
| Dark Text | `#1D2226` | Headings, body text |
| White | `#FFFFFF` | Button text, header |
| Error Red | `#e53935` | Validation errors |
| Pink Accent | `#e91e8c` | Required field asterisk (*) |

### Typography (Rubik Font)

| Style | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Page Title | 28px | 500 (Medium) | `#1D2226` | Screen headings |
| Subtitle | 18px | 400 (Regular) | `#6b7280` | Descriptive text |
| Button Text | 16px | 500 (Medium) | `#FFFFFF` | CTA buttons |
| Label | 13px | 500 (Medium) | `#6C25FF` | Floating input labels |
| Error Text | 12px | 400 (Regular) | `#e53935` | Validation messages |

### Viewport
- **Design size:** 375 × 812 (mobile phone frame)
- **Frame style:** `border-radius: 32px`, centered on gray background

---

## 📄 Page Details

### 1. Home — `/`
- Displays **"Welcome to PopX"** with a subtitle
- **"Create Account"** button → navigates to `/create-account`
- **"Already Registered? Login"** button → navigates to `/login`
- Content is aligned to the **bottom** of the frame

### 2. Register — `/create-account`
**Form Fields:**
| Field | Type | Required |
|---|---|---|
| Full Name | text | ✅ Yes |
| Phone number | tel | ✅ Yes |
| Email address | email | ✅ Yes |
| Password | password | ✅ Yes |
| Company name | text | ❌ Optional |
| Are you an Agency? | radio (Yes/No) | ✅ Yes |

**Phone Validation:**
- Real-time: turns red if > 10 digits typed
- On submit: blocks if empty or not exactly 10 digits
- Non-digit characters are automatically stripped

**On Success:**
- Saves `{ email, password, fullname }` → `localStorage` key: `popx_credentials`
- Saves `{ fullname, email }` → `sessionStorage` key: `popx_user`
- Navigates to `/account`

### 3. Login — `/login`
**Fields:** Email Address, Password

**Validation (on submit):**
| Case | Error Shown |
|---|---|
| Empty email | `"Email address is required"` (under email field) |
| Empty password | `"Password is required"` (under password field) |
| No account in localStorage | Red banner: `"No account found. Please create an account first."` |
| Email doesn't match | `"No account found with this email"` (under email) |
| Wrong password | `"Incorrect password. Please try again."` (under password) |
| ✅ All match | Navigates to `/account` |

- Errors **auto-clear** as user re-types
- Login button is **gray** when fields are empty, **purple** when filled

### 4. Account Settings — `/account`
- Reads user data from `sessionStorage` (`popx_user`)
- Displays **initials avatar** (purple gradient) with camera icon
- Shows user's **Full Name** and **Email**
- Lorem ipsum bio paragraph
- Dashed separator below profile card

---

## 🔐 Frontend Auth System

Since this is a frontend-only assignment, authentication is simulated using **browser storage**:

```
REGISTER                              LOGIN
────────────────────                  ────────────────────────────────
User fills form          →            User enters email + password
         ↓                                       ↓
Credentials saved to              Reads localStorage 'popx_credentials'
localStorage:                                     ↓
  popx_credentials = {            Validates: email match → password match
    email: "user@email.com",                      ↓
    password: "pass123",          Sets sessionStorage 'popx_user'
    fullname: "Saurabh"                           ↓
  }                               Navigates to /account
```

> **Why localStorage?**
> - Persists across browser refresh and tab close
> - No backend needed for assignment demo
> - Simulates a real "account exists" check

---

## 🧩 Reusable Components

### `ui/Input.jsx`
Floating-label input with error state support.
```jsx
<Input
  label="Email address"
  name="email"
  type="email"
  placeholder="Enter email"
  value={form.email}
  onChange={handleChange}
  required          // shows red asterisk on label
  error={emailError} // shows red border + message below
/>
```

### `ui/Button.jsx`
Configurable button with dynamic colors.
```jsx
<Button
  text="Create Account"
  type="submit"
  bgColor="#6C25FF"   // or "#c5c5c5" when disabled
  color="#FFFFFF"
  onClick={handleClick}
  className="btn-primary"
/>
```

### `components/RegisterInputs.jsx`
Standalone "Are you an Agency?" Yes/No radio group.
```jsx
<RegisterInputs
  value={form.isAgency}   // "yes" | "no"
  onChange={handleChange}
/>
```

---

## ⚙️ Setup & Run

```bash
# 1. Navigate to project folder
cd PopX

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# App runs at http://localhost:5173
```

---

## 📌 Key Implementation Notes

1. **No backend** — All data stored in browser `localStorage` / `sessionStorage`
2. **Phone validation** — Runs both real-time (on type) and on submit
3. **Login validation** — 5 distinct error cases with field-specific red highlights
4. **Account page** — Reads real user name from localStorage (not email-derived)
5. **Router** — Uses `createBrowserRouter` from React Router v6 (data router API)
6. **Font** — Rubik loaded via Google Fonts CDN in `index.html`
7. **Mobile frame** — `375px × calc(100vh - 40px)` centered card with `32px` border radius

---

## 👨‍💻 Author

**Saurabh** — Submitted as part of Educase India recruitment assignment.

> Repository: [github.com/Saurabh21Y/Educase_India](https://github.com/Saurabh21Y/Educase_India)
