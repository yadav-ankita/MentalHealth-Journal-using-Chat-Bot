import { useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useGlobalContext } from '../../context/AppContext';
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const Form = {
    name: '',
    email: '',
    password: '',
  }
  const setEmail = (e) => {
    setForm({ ...form, email: e.target.value })

  }
  const setName = (e) => {
    setForm({ ...form, name: e.target.value });

  }
  const setPassword = (e) => {
    setForm({ ...form, password: e.target.value });

  }
  const [form, setForm] = useState(Form);
  const { user, register} = useGlobalContext();
  const handleSingUp = (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    register({ name, email, password });
  };
  return (
    <>
        {user && <Navigate to='/Dashboard'/>}
      <Navbar />
      <div className='container'>
        <form onSubmit={handleSingUp} className='FormContainer'>
          <h4 style={{ textAlign: 'center' }}>Signup</h4>
          <label htmlFor='name'></label>
          <input type='text' name='name' placeholder='Name' onChange={setName} />
          <label htmlFor='email'></label>
          <input type='email' name='email' placeholder='Email' onChange={setEmail} />
          <label htmlFor='password'></label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              onChange={setPassword}
              style={{ width: '86%' }}
            />
            <span style={{ position: 'absolute', right: '30px', top: '40%' }}
              onClick={() => setShowPassword(!showPassword)}
            >{showPassword ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>

          <button className='loginBtn'>Signup</button>
          <p style={{ padding: '20px', margin: '10px' }}>Already have an account?
            <Link to="/Login" style={{ color: 'blue', textDecoration: 'none' }}>Login</Link>
          </p>
        </form>
      </div>
    </>
  )
}
