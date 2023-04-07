import './App.css';
import QrReader from 'react-qr-scanner'
import React,{useRef, useState} from 'react';

function App() {
  const [data,setData]= useState('');
  const [allcameras,setAllCameras] = useState([])
  const [selected, setSelected] = useState(null);

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
    
    setAllCameras(cameras)
    setSelected(cameras[0].deviceId)
  })
  .catch((err) => {
    console.log(err);
  })
  const HandleDeviceId  = (event) => {
    const deviceId = event.target.value;

    setSelected(deviceId);
  }
  console.log(selected);
  return (
    <div className="App">
      <div>QR Scanner Web view test</div>
      <select id="camera-selector" value={selected} onChange={HandleDeviceId}>
      {allcameras && allcameras.map(camera => (
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
