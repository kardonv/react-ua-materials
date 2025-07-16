import React, { useState } from 'react';

const initialItems = [
  'First Item',
  'Second Item',
  'Third Item',
  'Fourth Item',
];

export function ListKeys() {
  const [items, setItems] = useState(initialItems);

  const addItem = () => {
    setItems([...items, `New Item ${items.length + 1}`]);
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  const reverseItems = () => {
    setItems([...items].reverse());
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">List Without Keys - Demonstration</h2>
          <div className="alert alert-warning">
            <strong>Warning:</strong> This list is missing the <code>key</code> prop. 
            This can cause performance issues and unexpected behavior when items are reordered, added, or removed.
          </div>
          
          <div className="mb-3">
            <button className="btn btn-primary me-2" onClick={addItem}>
              Add Item
            </button>
            <button className="btn btn-danger me-2" onClick={removeFirst}>
              Remove First
            </button>
            <button className="btn btn-warning" onClick={reverseItems}>
              Reverse List
            </button>
          </div>

          <ul className="list-group">
            {items.map((item, index) => (
              <li key={item} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item}</span>
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ width: '200px' }}
                  placeholder="Type here to see the issue..."
                />
              </li>
            ))}
          </ul>

          <div className="mt-3">
            <h5>What happens without keys:</h5>
            <ul>
              <li>React can't efficiently track which items changed</li>
              <li>Input values may get mixed up when reordering</li>
              <li>Performance degrades with large lists</li>
              <li>Unexpected re-renders may occur</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListKeys; 