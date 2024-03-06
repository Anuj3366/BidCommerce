import React, { useEffect, useState } from 'react';
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

function ModeratorPanel() {
  const [sellers, setSellers] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/getseller`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setSellers(data)
      })
      .catch(err => console.error('Fetching users failed: ', err));
    fetch(`http://localhost:3000/getworker`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setWorkers(data)
      })
      .catch(err => console.error('Fetching users failed: ', err));
  }, []);

  const verifySeller = (sellerId) => {
    fetch(`http://localhost:3000/seller/${sellerId}/verify`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  const verifyWorker = (workerId) => {
    fetch(`http://localhost:3000/worker/${workerId}/verify`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
    <h2>Sellers</h2>
    {sellers.map(seller => (
      <UserContainer key={seller._id}>
        <div>
          <h3>{seller.shopname}</h3>
          <UserID>ID: {seller._id}</UserID>
        </div>
        <button onClick={() => {
          verifySeller(seller._id);
          setSellers(sellers.filter(s => s._id !== seller._id));
        }}>Verify Seller</button>
      </UserContainer>
    ))}

    <h2>Workers</h2>
    {workers.map(worker => (
      <UserContainer key={worker._id}>
        <div>
          <h3>{worker.name}</h3>
          <UserID>ID: {worker._id}</UserID>
        </div>
        <button onClick={() => {
          verifyWorker(worker._id);
          setWorkers(workers.filter(w => w._id !== worker._id));
        }}>Verify Worker</button>
      </UserContainer>
    ))}
  </div>
  );
}

export default ModeratorPanel;
