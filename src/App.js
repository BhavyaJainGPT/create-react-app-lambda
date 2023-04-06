import React, { useState, useEffect, useRef } from 'react';

const QrScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: { facingMode: cameraFacingMode } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      })
      .catch((error) => console.error(error));

    return () => {
      if (isScanning) {
        videoRef.current.srcObject.getTracks()[0].stop();
      }
    };
  }, [isScanning, cameraFacingMode]);

  const handleSwitchCamera = () => {
    setCameraFacingMode((prevMode) =>
      prevMode === 'environment' ? 'user' : 'environment'
    );
  };

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
      <button onClick={handleSwitchCamera}>Switch Camera</button>
    </div>
  );
};

export default QrScanner;
