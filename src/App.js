import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [facingMode, setFacingMode] = useState('environment');
  const qrRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = (err) => {
    console.error(err);
  }

  const handleSwitchCamera = () => {
    if (facingMode === 'environment') {
      setFacingMode('user');
    } else {
      setFacingMode('environment');
    }

    qrRef.current.pause();
    qrRef.current.play();
  }

  return (
    <div>
      <QrReader
        ref={qrRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode={facingMode}
      />
      <button onClick={handleSwitchCamera}>Switch Camera</button>
      <p>{result}</p>
    </div>
  );
}

export default QRScanner;
