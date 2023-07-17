// RecognitionsTablePage.js
import React, { useState, useEffect } from 'react';
import '../css/RecognitionsTable.css';
import { fetchRecognitions } from '../components/fetchRecognitions';

const RecognitionsTablePage = () => {
  const [recognitions, setRecognitions] = useState([]);

  useEffect(() => {
    fetchRecognitions().then(data => setRecognitions(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {recognitions.map(recognition => (
          <tr key={recognition.id}>
            <td>{recognition.name}</td>
            <td>{new Date(recognition.time).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecognitionsTablePage;
