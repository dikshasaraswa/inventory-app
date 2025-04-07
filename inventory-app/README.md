# Lab Inventory Management

A simple React-based web application to manage lab inventory:

## Features
- Admin panel to issue items and view queues
- Students can request and reserve items
- Queues are maintained for unavailable items

## Tech Stack
- React
- HTML/CSS/JS

## Getting Started
```bash
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## Folder Structure
```
inventory-management-site/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AdminPanel.js
│   │   ├── ItemRequest.js
│   │   ├── InventoryList.js
│   │   └── QueueList.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```








/*
This is a basic Inventory Management System web app using React for the frontend. It includes:
- Admin functionality to view and manage inventory.
- Student functionality to request and reserve items.
- A simple queue system for managing item requests.
*/

// File structure:
// inventory-management-site/
// ├── public/
// │   └── index.html
// ├── src/
// │   ├── components/
// │   │   ├── AdminPanel.js
// │   │   ├── ItemRequest.js
// │   │   ├── InventoryList.js
// │   │   └── QueueList.js
// │   ├── App.js
// │   ├── index.css
// │   └── index.js
// ├── package.json
// └── README.md

/* === public/index.html === */
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lab Inventory Management</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>

/* === src/index.js === */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/* === src/index.css === */
body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h1, h2 {
  text-align: center;
}

.container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  min-width: 300px;
}

input, select, button {
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

/* === src/App.js === */
import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import ItemRequest from './components/ItemRequest';

const App = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Oscilloscope', quantity: 2, queue: [] },
    { id: 2, name: 'Multimeter', quantity: 5, queue: [] },
    { id: 3, name: 'Soldering Kit', quantity: 1, queue: [] },
  ]);

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

/* === src/components/AdminPanel.js === */
import React from 'react';

const AdminPanel = ({ inventory, updateInventory }) => {
  const handleIssueNext = (itemId) => {
    const updated = inventory.map(item => {
      if (item.id === itemId && item.queue.length > 0 && item.quantity > 0) {
        item.quantity -= 1;
        const nextStudent = item.queue.shift();
        alert(`Issued ${item.name} to ${nextStudent}`);
      }
      return item;
    });
    updateInventory(updated);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {inventory.map(item => (
        <div key={item.id}>
          <strong>{item.name}</strong><br/>
          Quantity: {item.quantity} <br/>
          Queue: {item.queue.join(', ') || 'None'} <br/>
          <button onClick={() => handleIssueNext(item.id)}>Issue Next</button>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;

/* === src/components/ItemRequest.js === */
import React, { useState } from 'react';

const ItemRequest = ({ inventory, updateInventory }) => {
  const [studentName, setStudentName] = useState('');
  const [itemId, setItemId] = useState('');

  const handleRequest = () => {
    if (!studentName || !itemId) return alert("Fill all fields");
    const updated = inventory.map(item => {
      if (item.id === parseInt(itemId)) {
        if (item.quantity > 0) {
          item.quantity -= 1;
          alert(`Item issued immediately to ${studentName}`);
        } else {
          item.queue.push(studentName);
          alert(`${studentName} added to queue for ${item.name}`);
        }
      }
      return item;
    });
    updateInventory(updated);
    setStudentName('');
    setItemId('');
  };

  return (
    <div>
      <h2>Student Request</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <br />
      <select value={itemId} onChange={(e) => setItemId(e.target.value)}>
        <option value="">Select Item</option>
        {inventory.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
      <br />
      <button onClick={handleRequest}>Request Item</button>
    </div>
  );
};

export default ItemRequest;

/* === src/components/InventoryList.js === */
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

/* === src/components/QueueList.js === */
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

/* === package.json === */
{
  "name": "inventory-management-site",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "5.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

/* === README.md === */
# Lab Inventory Management

A simple React-based web application to manage lab inventory:

## Features
- Admin panel to issue items and view queues
- Students can request and reserve items
- Queues are maintained for unavailable items

## Tech Stack
- React
- HTML/CSS/JS

## Getting Started
```bash
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## Folder Structure
```
inventory-management-site/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AdminPanel.js
│   │   ├── ItemRequest.js
│   │   ├── InventoryList.js
│   │   └── QueueList.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```
