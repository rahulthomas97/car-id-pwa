import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setPrediction('');
    try {
      const response = await fetch('https://khnp7tdlz3.execute-api.eu-west-2.amazonaws.com/prod/invocations', {
        method: 'POST',
        headers: {
          'Content-Type': "image/png"
        },
        body: selectedFile,
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error occurred');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Car ID PWA</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading || !selectedFile} style={{ marginLeft: '10px' }}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <h2>Prediction:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
