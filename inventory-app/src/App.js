import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import ItemRequest from './components/ItemRequest';

const App = () => {
  const initialInventory = [
    { id: 1, name: 'Oscilloscope', quantity: 2, issuedTo: [], queue: [] },
    { id: 2, name: 'Multimeter', quantity: 5, issuedTo: [], queue: [] },
    { id: 3, name: 'Soldering Kit', quantity: 1, issuedTo: [], queue: [] },
  ];

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('lab-inventory');
    return saved ? JSON.parse(saved) : initialInventory;
  });

  useEffect(() => {
    localStorage.setItem('lab-inventory', JSON.stringify(inventory));
  }, [inventory]);

  const updateInventory = (updated) => setInventory([...updated]);

  return (
    <div>
      <h1>Lab Inventory Management</h1>
      <div className="container">
        <div className="panel">
          <AdminPanel inventory={inventory} updateInventory={updateInventory} />
        </div>
        <div className="panel">
          <ItemRequest inventory={inventory} updateInventory={updateInventory} />
        </div>
      </div>
    </div>
  );
};

export default App;
