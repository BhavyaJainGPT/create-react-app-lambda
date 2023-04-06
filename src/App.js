import React, { useState, useRef } from "react";
import QrReader from "react-qr-scanner";

const QrScanner = () => {
  const [camera, setCamera] = useState("environment");
  const videoRef = useRef();

  const handleScan = (result) => {
    if (result) {
      alert(result.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const switchCamera = () => {
    setCamera(camera === "environment" ? "user" : "environment");
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        facingMode={camera}
        videoConstraints={{
          facingMode: camera
        }}
        ref={videoRef}
      />
      <button onClick={switchCamera}>Switch Camera</button>
    </div>
  );
};

export default QrScanner;
