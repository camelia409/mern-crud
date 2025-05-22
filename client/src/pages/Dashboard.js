import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { getUsers } from '../services/api';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        console.log('Fetched users:', data);
        setUsers(data);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch users. Please log in again.';
        console.error('Fetch users error:', err.response);
        setError(message);
        toast.error(message);
        localStorage.removeItem('token');
        navigate('/');
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const clearEdit = () => {
    setUserToEdit(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Dashboard</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <UserForm setUsers={setUsers} userToEdit={userToEdit} clearEdit={clearEdit} />
            <UserList users={users} setUsers={setUsers} onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;