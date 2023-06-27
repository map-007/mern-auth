import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError();
      }, 5000);
      return setError("Passwords are do not match")
    }

    try {
      const { data } = await axios.post("/api/auth/register", { username, email, password }, config)

      localStorage.setItem("authToken", data.token)
      navigate("/")
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError("")
      }, 5000);
    }
  }

  return (
    <div className='register-screen'>
      <form onSubmit={registerHandler} className='register-screen__form'>
        <h3 className='register-screen__title'>Register</h3>
        { error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor="name">Username:</label>
          <input type="text"
            required
            name="name"
            placeholder='Enter username'
            value={username}
            id="name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input type="text"
            required
            name="email"
            placeholder='Enter email'
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label>
          <input type="password"
            required
            name="password"
            placeholder='Enter password'
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input type="password"
            required
            name="confirmpassword"
            placeholder='Confirm password'
            value={confirmpassword}
            id="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Register</button>
        <span className='register-screen__subtext'>
          Already have an account? <Link to="/"> Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register