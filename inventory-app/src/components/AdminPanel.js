import React from 'react';

const AdminPanel = ({ inventory, updateInventory }) => {
  const handleReturn = (itemId, studentName) => {
    const updated = inventory.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item };
        newItem.quantity += 1;
        newItem.issuedTo = newItem.issuedTo.filter((s) => s !== studentName);

        // Check queue and issue to first in line
        if (newItem.queue.length > 0) {
          const nextStudent = newItem.queue.shift();
          newItem.issuedTo.push(nextStudent);
          newItem.quantity -= 1;
        }
        return newItem;
      }
      return item;
    });

    updateInventory(updated);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.name}</strong> - Quantity: {item.quantity}
            {item.issuedTo.length > 0 && (
              <div>
                <em>Issued to:</em>
                <ul>
                  {item.issuedTo.map((student, idx) => (
                    <li key={idx}>
                      👤 {student}{' '}
                      <button
                        style={{ marginLeft: '1rem' }}
                        onClick={() => handleReturn(item.id, student)}
                      >
                        Return
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.queue.length > 0 && (
              <div>
                <em>Waiting queue:</em>
                <ul>
                  {item.queue.map((student, index) => (
                    <li key={index}>🕒 {student}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
