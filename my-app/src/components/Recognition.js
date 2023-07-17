import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import '../css/Recognition.css';

const Recognition = () => {
  const [recognizedFaces, setRecognizedFaces] = useState([]);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    axios.post('http://localhost:5000/recognize', {
      image: imageSrc.split(',')[1]
    }).then(response => {
      setRecognizedFaces(response.data);
    });
  }, [webcamRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="webcam-container">
        <Webcam
          audio={false}
          mirrored={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
      </div>
      <ul className="predictions-container">
        {recognizedFaces.map(face => (
          <li key={face.name + face.crime}>
            <div className="prediction">
              <span className="name">{face.name}</span>
              <span className="distance">({(1 - face.distance) * 100}% match)</span>
            </div>
            <div className="crime">{face.crime}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Recognition;
