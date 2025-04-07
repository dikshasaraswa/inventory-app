import React from 'react';

const InventoryList = ({ inventory }) => (
  <div>
    <h2>Inventory List</h2>
    {inventory.map(item => (
      <div key={item.id}>
        <strong>{item.name}</strong> - Quantity: {item.quantity}<br/>
        <hr/>
      </div>
    ))}
  </div>
);

export default InventoryList;
