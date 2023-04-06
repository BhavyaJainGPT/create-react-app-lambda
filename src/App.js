import './App.css';
import QrReader from 'react-qr-scanner'
import React,{useState} from 'react';
function App() {
  const [data,setData]= useState('');
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
      <div>{data}</div>
     <QrReader
       delay={300}
       constraints={{
        facingMode: "environment"
    }}
       onError={handleError}
       onScan={handleScan}
       style={{width: '100%'}}
       />
      
    </div>
  );
}

export default App;
