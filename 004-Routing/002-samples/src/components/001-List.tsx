import React from 'react';

const items = [
  'Learn React',
  'Build a project',
  'Deploy to production',
];

export function List() {
  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Simple React List</h2>
          <ul className="list-group">
            {items.map((item, idx) => (
              <li key={idx} className="list-group-item">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default List; 