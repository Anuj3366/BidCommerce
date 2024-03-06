import React, { useEffect, useState } from 'react';
import Center from "@/components/Center";
import styled from 'styled-components';


const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const UserID = styled.span`
  font-size: 0.8em;
  color: #888;
`;


function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
      .catch(err => console.error('Fetching users failed: ', err));
  }, []);

  const promoteUser = (userId) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/user/${userId}/promote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(err => console.error(err));
  };

  return (
    <Center>
      <div>
        <h2>Users</h2>
        {users.length > 0 ? (
          users.map(user => (
            <UserContainer key={user._id}>
              <div>
                <h3>{user.email}</h3>
                <UserID>ID: {user._id}</UserID>
              </div>
              <button onClick={() => promoteUser(user._id)}>Promote to Moderator</button>
            </UserContainer>
          ))
        ) : (
          <Center>
            <h2>No More User Available</h2>
          </Center>
        )}
      </div>
    </Center>
  );
}

export default AdminPanel;
