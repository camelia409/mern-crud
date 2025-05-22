import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('https://mern-crud-ji32.onrender.com/api/auth/register', form);
      alert(res.data.msg);
      navigate('/login');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
