// RecognitionsTable.js
import React, { useState } from 'react';
import '../css/RecognitionsTable.css';
import { useNavigate } from 'react-router-dom';
import { fetchRecognitions } from '../components/fetchRecognitions';

const RecognitionsTable = () => {
  const [recognitions, setRecognitions] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    fetchRecognitions().then(data => {
      setRecognitions(data);
      navigate('/table', { target: '_blank' });
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      Fetch Recognitions
    </button>
  );
};

export default RecognitionsTable;
