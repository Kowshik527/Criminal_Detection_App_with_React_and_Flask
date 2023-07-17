import React, { useState } from 'react';
import axios from 'axios';
import '../css/Registration.css';

const Registration = () => {
  const [name, setName] = useState('');
  const [crime, setCrime] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/register', {
      name: name,
      crime: crime,
      image: image.split(',')[1]
    }).then(response => {
      console.log(response.data);
      alert('Registration successful!');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name} onChange={event => setName(event.target.value)} />
      </div>
      <div>
        <label htmlFor="crime">Crime:</label>
        <input id="crime" type="text" value={crime} onChange={event => setCrime(event.target.value)} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input id="image" type="file" accept="image/*" onChange={event => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(event.target.files[0]);
          fileReader.onload = () => {
            setImage(fileReader.result);
          };
        }} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Registration;
