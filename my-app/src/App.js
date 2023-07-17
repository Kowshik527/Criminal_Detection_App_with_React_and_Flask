// App.js

import React from 'react';
import Recognition from './components/Recognition';
import Registration from './components/Registration';
import RecognitionsTable from './components/RecognitionsTable';
import { Routes, Route, Link } from 'react-router-dom';
import RecognitionsTablePage from './components/RecognitionsTablePage';

import './App.css';

const App = () => {
  return (
    <div>
      {/* <h1>Criminal Detection App</h1> */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Criminal Detection App
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/registration" className="nav-link" >Registration</Link>
          </li>
          <li className="nav-item">
            <Link to="/recognition" className="nav-link">Recognition</Link>
          </li>
          <li className="nav-item"> 
            <Link to="/table" className="nav-link">Table</Link>
          </li>
        </ul>
      </nav>
      <div>
      <Routes className="container">
        <Route path="/" element={<h2 style={{textAlign: 'center'}}>Welcome to the Criminal Detection App</h2>}
 />
        <Route path="/registration" element={<Registration />} />
        <Route path="/recognition" element={<Recognition />} />
        <Route path="/table" element={<RecognitionsTablePage />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
