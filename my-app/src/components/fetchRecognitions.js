// fetchRecognitions.js
import axios from 'axios';

export const fetchRecognitions = () => {
  return axios.get('http://localhost:5000/recognitions')
    .then(response => response.data)
    .catch(error => console.log(error));
};