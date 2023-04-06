import React, { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        console.log(videoDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const videoConstraints = {
    facingMode: { exact: camera }
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        facingMode={camera}
        videoConstraints={videoConstraints}
        ref={videoRef}
      />
      <button onClick={switchCamera}>Switch Camera</button>
    </div>
  );
};

export default QrScanner;
