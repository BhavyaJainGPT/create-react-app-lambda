import './App.css';
import QrReader from 'react-qr-scanner'
import React,{useEffect, useRef, useState} from 'react';

function App() {
  const [data,setData]= useState('');
  const [cameras,setCameras] = useState([])
  const [selected, setSelected] = useState(null);
  const qrReaderRef = useRef(null);
 
 



const handleCameraSelecton = event => {
  setSelected(event.target.value)
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
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      const videoSelect = []
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          videoSelect.push(device)
         setCameras(videoSelect)
        }
      })
      return videoSelect
    })
    .then((devices) => {
      setSelected(devices[0].deviceId)
    })
    .catch((error) => {
      console.log(error)
    })
   
  },[])

  console.log(cameras)
  return (
    <div className="App">
      <div>QR Scanner Web view test</div>
      <div>{data}</div>
      <select id="camera-selector" value={selected} onChange={handleCameraSelecton}>
        {cameras.map(camera => (
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
