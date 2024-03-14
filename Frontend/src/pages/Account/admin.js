import React, { useEffect, useState } from 'react';
import Center from "@/components/Center";
import styled from 'styled-components';
import { toast } from 'sonner';

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

    fetch(`http://localhost:3000/admin/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
      .catch(err => console.error('Fetching users failed: ', err));
  }, []);

  const promoteUser = (userId) => {

    fetch(`http://localhost:3000/user/${userId}/promote`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        toast.success("New Moderator Verified")
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(err => {
        toast.error("Failed to Verify Moderator")
        console.error(err)
      });
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
