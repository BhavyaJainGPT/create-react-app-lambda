import { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices.filter((device) => device.kind === 'videoinput'));
    });
  }, []);

  const handleScan = (data) => {
    console.log(data);
  };

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  return (
    <div>
      <select value={selectedDeviceId} onChange={handleDeviceChange}>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      <QrScanner
        delay={300}
        onError={(err) => console.error(err)}
        onScan={handleScan}
        facingMode={null}
        deviceId={selectedDeviceId}
        style={{ width: '100%' }}
      />
    </div>
  );
}
export default App;
