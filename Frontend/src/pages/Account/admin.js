import React, { useEffect, useState } from 'react';

function AdminPanel({ adminEmail }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/admin/${adminEmail}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Fetching users failed: ', err));
  }, [adminEmail]);

  const promoteUser = (userId) => {
    fetch(`/user/${userId}/promote`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <button onClick={() => promoteUser(user._id)}>Promote to Moderator</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
