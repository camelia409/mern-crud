import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import '../App.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("https://mern-crud-ji32.onrender.com/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    await axios.post("https://mern-crud-ji32.onrender.com/api/users", user);
    fetchUsers();
  };

  const updateUser = async (id, updatedUser) => {
    await axios.put(`https://mern-crud-ji32.onrender.com/api/users/${id}`, updatedUser);
    setEditingUser(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://mern-crud-ji32.onrender.com/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container dashboard">
      <h2>User Dashboard</h2>
      <UserForm
        onSubmit={editingUser ? (data) => updateUser(editingUser._id, data) : addUser}
        editingUser={editingUser}
      />
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <b>{user.name}</b> ({user.email})
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
