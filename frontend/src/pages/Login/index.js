import { Link, Navigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/AppContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './Login.css'
import Navbar from '../../components/Navbar/Navbar';
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const Form = {
    email: '',
    password: '',
  }
  const setEmail = (e) => {
    setForm({ ...form, email: e.target.value })

  }
  const setPassword = (e) => {
    setForm({ ...form, password: e.target.value });
  }
  const [form, setForm] = useState(Form);
  const { user, login } = useGlobalContext();
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = form;
      login({ email, password });
  };
  return (
    <>
      {user && <Navigate to='/Dashboard' />}
      <Navbar />
      <div className='container'>
        <form onSubmit={handleLogin} className='FormContainer'>
          <h4 style={{ textAlign: 'center' }}>Login</h4>
          <label ></label>
          <input type='email' placeholder='Email' onChange={setEmail} />
          <label ></label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              onChange={setPassword}
              style={{ width: '87%' }}
            />
            <span style={{ position: 'absolute', right: '30px', top: '40%' }}
              onClick={() => setShowPassword(!showPassword)}
            >{showPassword ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>
          <button className='loginBtn'>LOGIN</button>
          <p style={{ padding: '20px', margin: '10px' }}>Not registered yet?
            <Link to="/Signup" style={{ color: 'blue', textDecoration: 'none' }}>Create an account</Link>
          </p>
        </form>
      </div>
    </>
  )
}
