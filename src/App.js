import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [batchData, setBatchData] = useState({
    batchNo: '',
    vesselNo: '',
    operator: '',
    date: '',
  });

  const handleChange = (e) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🌿 MR Herbal App – Batch Traceability</h1>

      <input name="batchNo" placeholder="Batch No." onChange={handleChange} /><br />
      <input name="vesselNo" placeholder="Vessel No." onChange={handleChange} /><br />
      <input name="operator" placeholder="Operator Name" onChange={handleChange} /><br />
      <input type="date" name="date" onChange={handleChange} /><br /><br />

      <h3>🔍 QR Code Preview</h3>
      <div style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
        <QRCode value={JSON.stringify(batchData)} size={150} />
      </div>
    </div>
  );
}

export default App;
