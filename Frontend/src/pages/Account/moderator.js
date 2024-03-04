import React, { useEffect, useState } from 'react';

function ModeratorPanel({ moderatorEmail }) {
  const [sellers, setSellers] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    // Fetch all sellers and workers when the component mounts
    fetch(`/moderator/${moderatorEmail}/sellers`)
      .then(res => res.json())
      .then(data => setSellers(data))
      .catch(err => console.error('Fetching sellers failed: ', err));

    fetch(`/moderator/${moderatorEmail}/workers`)
      .then(res => res.json())
      .then(data => setWorkers(data))
      .catch(err => console.error('Fetching workers failed: ', err));
  }, [moderatorEmail]);

  const verifySeller = (sellerId) => {
    // Verify a seller
    fetch(`/seller/${sellerId}/verify`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  const verifyWorker = (workerId) => {
    // Verify a worker
    fetch(`/worker/${workerId}/verify`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Sellers</h2>
      {sellers.map(seller => (
        <div key={seller._id}>
          <h3>{seller.shopname}</h3>
          <button onClick={() => verifySeller(seller._id)}>Verify Seller</button>
        </div>
      ))}

      <h2>Workers</h2>
      {workers.map(worker => (
        <div key={worker._id}>
          <h3>{worker.name}</h3>
          <button onClick={() => verifyWorker(worker._id)}>Verify Worker</button>
        </div>
      ))}
    </div>
  );
}

export default ModeratorPanel;
