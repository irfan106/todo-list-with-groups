import React from 'react';
import './App.css';
import GroupList from './components/GroupList';

function App() {
  return (
    <div className="App">
      <h1 className="header">Todo App</h1>
      <div className="container">
        <GroupList />
      </div>
    </div>
  );
}

export default App;
