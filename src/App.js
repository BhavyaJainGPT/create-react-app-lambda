import './App.css';
import QrReader from 'react-qr-scanner'
import React,{useRef, useState} from 'react';

function App() {
  const [data,setData]= useState('');
  const [selected, setSelected] = useState();
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
    setSelected(cameras)
  })
  .catch((err) => {
    console.log(err);
  })
  return (
    <div className="App">
      <div>QR Scanner Web view test</div>
      {cameras.map((item,i) => (
        <div>{item.label}</div>
      ))}
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
