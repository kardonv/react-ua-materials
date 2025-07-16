import React, { useState } from 'react';
import List from './components/001-List';
import UserList from './components/002-List';
import ListKeys from './components/003-List';
import './App.css';

function App() {
  const [page, setPage] = useState<'list' | 'users' | 'keys'>('list');

  return (
    <div className="App">
      <nav className="nav nav-pills justify-content-center my-4">
        <button
          className={`nav-link${page === 'list' ? ' active' : ''}`}
          onClick={() => setPage('list')}
        >
          Simple List
        </button>
        <button
          className={`nav-link${page === 'users' ? ' active' : ''}`}
          onClick={() => setPage('users')}
        >
          User Table
        </button>
        <button
          className={`nav-link${page === 'keys' ? ' active' : ''}`}
          onClick={() => setPage('keys')}
        >
          Without Keys
        </button>
      </nav>
      {page === 'list' && <List />}
      {page === 'users' && <UserList />}
      {page === 'keys' && <ListKeys />}
    </div>
  );
}

export default App;
