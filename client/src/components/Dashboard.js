import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import '../App.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    await axios.post("http://localhost:5000/api/users", user);
    fetchUsers();
  };

  const updateUser = async (id, updatedUser) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, updatedUser);
    setEditingUser(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container dashboard">

      <h2>User Dashboard</h2>
      <UserForm
        onSubmit={editingUser ? (data) => updateUser(editingUser.id, data) : addUser}
        editingUser={editingUser}
      />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <b>{user.name}</b> ({user.email})
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
