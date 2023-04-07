import './App.css';
import QrReader from 'react-qr-scanner'
import React,{useRef, useState} from 'react';

function App() {
  const [data,setData]= useState('');
  const [selected, setSelected] = useState();
  const [deviceId,setDeviceId] = useState();
  const qrReaderRef = useRef(null);
 
 




  const handleScan = (data) => {
    if(data) {
      console.log(data);
      setData(data.text);
    }
  }
  
  const handleError = (err) => {
    console.log(err)
  }

  navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    const cameras = devices.filter(device => device.kind === 'videoinput')
    console.log(devices)
    console.log(devices[0])

    setSelected(cameras[0].deviceId)
  })
  .catch((err) => {
    console.log(err);
  })
  const HandleDeviceId  = (event) => {
    const deviceId = event.target.value;
    setSelected(deviceId);
  }
  return (
    <div className="App">
      <div>QR Scanner Web view test</div>
      <select id="camera-selector" value={selected} onChange={HandleDeviceId}>
      {selected && selected.map(camera => (
          <option key={camera.deviceId} value={camera.deviceId}>{camera.label}</option>
      ))}
      </select>
      
     <QrReader
     ref={qrReaderRef}
       delay={300}
       video={true}
       facingMode={selected ? {exact : selected} : null}
       constraints={selected  && ({ audio: false, video: { deviceId: selected  } })}
       onError={handleError}
       onScan={handleScan}
       style={{width: '100%'}}
       />
    
      <label>Your URL is:</label>
      <a href={data}>{data}</a>
    </div>
  );
}

export default App;
