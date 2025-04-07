import React from 'react';

const QueueList = ({ inventory }) => (
  <div>
    <h2>Request Queues</h2>
    {inventory.map(item => (
      <div key={item.id}>
        <strong>{item.name}</strong>: {item.queue.join(', ') || 'None'}
        <hr/>
      </div>
    ))}
  </div>
);

export default QueueList;