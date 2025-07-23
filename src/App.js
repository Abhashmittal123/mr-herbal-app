import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const exportLabelPDF = () => {
    const label = document.getElementById('label-preview');
    html2canvas(label).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save(`${batchData.batchNo || 'Batch'}_Label.pdf`);
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🌿 MR Herbal App – Batch Traceability</h1>

      <input name="batchNo" placeholder="Batch No." onChange={handleChange} /><br />
      <input name="vesselNo" placeholder="Vessel No." onChange={handleChange} /><br />
      <input name="operator" placeholder="Operator Name" onChange={handleChange} /><br />
      <input type="date" name="date" onChange={handleChange} /><br /><br />

      <h3>🔍 QR Code Preview</h3>
      <QRCode value={JSON.stringify(batchData)} size={150} />

      <h3>🖨️ Label Preview</h3>
      <div
        id="label-preview"
        style={{
          marginTop: '1rem',
          padding: '16px',
          background: '#fff',
          border: '1px solid #ccc',
          width: '300px',
        }}
      >
        <h4 style={{ marginBottom: '0' }}>MR Herbal & Naturals</h4>
        <p><strong>GSTIN:</strong> 09XXXXXXXXXX1Z</p>
        <hr />
        <p><strong>Batch No:</strong> {batchData.batchNo}</p>
        <p><strong>Vessel:</strong> {batchData.vesselNo}</p>
        <p><strong>Operator:</strong> {batchData.operator}</p>
        <p><strong>Date:</strong> {batchData.date}</p>
        <QRCode value={JSON.stringify(batchData)} size={100} />
        <hr />
        <p><em>Digitally Verified ✅</em></p>
        <p>Signature: _____________</p>
      </div>

      <br />
      <button onClick={exportLabelPDF}>Download Label as PDF</button>
    </div>
  );
}

export default App;
