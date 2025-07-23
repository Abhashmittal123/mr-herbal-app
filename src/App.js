import React, { useState } from 'react';
import QRCode from 'qrcode.react';

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
    <div style={{ padding: '2rem' }}>
      <h1>MR Herbal Traceability App 🌿</h1>
      <input name="batchNo" placeholder="Batch No." onChange={handleChange} />
      <input name="vesselNo" placeholder="Vessel No." onChange={handleChange} />
      <input name="operator" placeholder="Operator Name" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <br /><br />
      <QRCode value={JSON.stringify(batchData)} />
    </div>
  );
}

export default App;
