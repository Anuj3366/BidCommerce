import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

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
    const token = Cookies.get('jwt');
    fetch(`http://localhost:3000/getseller`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        ,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSellers(data);
      })
      .catch(err => console.error('Fetching users failed: ', err));
  }, []);

  useEffect(() => {
    const token = Cookies.get('jwt');
    fetch(`http://localhost:3000/getworker`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        ,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setWorkers(data);
      })
      .catch(err => console.error('Fetching users failed: ', err));
  }, []);

  const verifySeller = (sellerId) => {
    const token = Cookies.get('jwt');
    fetch(`http://localhost:3000/seller/${sellerId}/verify`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          ,
        },
      })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  const verifyWorker = (workerId) => {
    const token = Cookies.get('jwt');
    fetch(`http://localhost:3000/worker/${workerId}/verify`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          ,
        },
      })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };
  return (
    <div>
      <h2>Sellers</h2>
      {sellers.length > 0 ? (
        sellers.map(seller => (
          <UserContainer key={seller._id}>
            <div>
              <h3>{seller.shopname}</h3>
              <UserID>ID: {seller._id}</UserID>
            </div>
            <button onClick={() => {
              verifySeller(seller.email);
              setSellers(sellers.filter(s => s._id !== seller._id));
            }}>Verify Seller</button>
          </UserContainer>
        ))
      ) : (
        <p>No more sellers to verify.</p>
      )}

      <h2>Workers</h2>
      {workers.length > 0 ? (
        workers.map(worker => (
          <UserContainer key={worker._id}>
            <div>
              <h3>{worker.email}</h3>
              <UserID>ID: {worker._id}</UserID>
            </div>
            <button onClick={() => {
              verifyWorker(worker.email);
              setWorkers(workers.filter(w => w._id !== worker._id));
            }}>Verify Worker</button>
          </UserContainer>
        ))
      ) : (
        <p>No more workers to verify.</p>
      )}
    </div>
  );
}

export default ModeratorPanel;
