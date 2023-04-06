import './App.css';
import QrReader from 'react-qr-scanner'
import React,{useRef, useState} from 'react';
function App() {
  const [data,setData]= useState('');

  const qrReaderRef = useRef(null);
  const [activeDeviceId,setActiveDeviceId] = useState(null);
  const [availableDevices,setAvailableDevices] = useState([]);
 
 const handleDeviceChange = (event) => {
  setActiveDeviceId(event.target.value);
 }

 const handleDevicesFound = (devices) => {
  setAvailableDevices(devices);
  setActiveDeviceId(devices[0].deviceId);
 }

  const handleScan = (data) => {
    if(data) {
      console.log(data);
      setData(data.text);
    }
  }
  
  const handleError = (err) => {
    console.log(err)
  }
  return (
    <div className="App">
      <div>QR Scanner Web view test</div>
      <select value={activeDeviceId} onChange={handleDeviceChange}>
        {availableDevices.map((device)=> (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      <div>{data}</div>
     <QrReader
     ref={qrReaderRef}
       delay={300}
       video={true}
       facingMode={activeDeviceId ? undefined : 'environment'}
       activeDeviceId={activeDeviceId}
       onDevicesFound={handleDevicesFound}
       onError={handleError}
       onScan={handleScan}
       style={{width: '100%'}}
       />
      
    </div>
  );
}

export default App;
