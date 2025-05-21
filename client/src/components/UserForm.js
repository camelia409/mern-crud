import React, { useState, useEffect } from 'react';

function UserForm({ onSubmit, editingUser }) {
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setForm({ name: editingUser.name, email: editingUser.email });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
    </form>
  );
}

export default UserForm;
