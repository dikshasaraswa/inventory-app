import React, { useState } from 'react';

const ItemRequest = ({ inventory, updateInventory }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [studentName, setStudentName] = useState('');

  const handleRequest = (itemId) => {
    if (!studentName.trim()) return alert('Enter a valid name');

    const updatedInventory = inventory.map((item) => {
      if (item.id === itemId) {
        const updated = { ...item };

        // Init issuedTo array if not already
        if (!updated.issuedTo) updated.issuedTo = [];

        if (updated.quantity > 0) {
          updated.quantity -= 1;
          updated.issuedTo.push(studentName);
        } else {
          updated.queue.push(studentName);
        }
        return updated;
      }
      return item;
    });

    updateInventory(updatedInventory);
    setStudentName('');
    setSelectedId(null);
  };

  return (
    <div>
      <h2>Request Lab Items</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.name}</strong> (Available: {item.quantity})
            <button
              onClick={() => setSelectedId(item.id)}
              style={{ marginLeft: '1rem' }}
            >
              Request
            </button>
            {selectedId === item.id && (
              <div style={{ marginTop: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <button
                  onClick={() => handleRequest(item.id)}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Submit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemRequest;
