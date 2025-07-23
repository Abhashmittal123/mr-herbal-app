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
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#f6f8f9', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#005f3d', color: 'white', padding: '1rem' }}>
        <h1>MR Herbal Dashboard 🌿</h1>
        <p style={{ marginTop: '-8px' }}>Digitally Verified | app.mrherbal.in</p>
      </header>

      <main style={{ padding: '2rem' }}>
        <section style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
          <h2>Batch Entry Form</h2>
          <input name="batchNo" placeholder="Batch No." onChange={handleChange} /><br />
          <input name="vesselNo" placeholder="Vessel No." onChange={handleChange} /><br />
          <input name="operator" placeholder="Operator Name" onChange={handleChange} /><br />
          <input type="date" name="date" onChange={handleChange} /><br /><br />
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>QR Preview</h2>
          <div style={{ background: 'white', display: 'inline-block', padding: '1rem' }}>
            <QRCode value={JSON.stringify(batchData)} size={150} />
          </div>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Printable Label</h2>
          <div
            id="label-preview"
            style={{
              width: '300px',
              padding: '1rem',
              background: 'white',
              border: '1px solid #ccc',
            }}
          >
            <h3 style={{ marginBottom: '0' }}>MR Herbal & Naturals</h3>
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
          <button onClick={exportLabelPDF}>Download PDF</button>
        </section>
      </main>
    </div>
  );
}

export default App;
