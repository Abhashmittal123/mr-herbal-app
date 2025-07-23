import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function LabelExport({ batchData }) {
  const labelRef = useRef();

  const exportToPDF = () => {
    html2canvas(labelRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save(`${batchData.batchNo}_Label.pdf`);
    });
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>🖨️ Printable Label</h3>

      <div
        ref={labelRef}
        style={{
          padding: '16px',
          background: '#fff',
          border: '1px solid #ccc',
          width: '300px',
          fontFamily: 'Arial',
        }}
      >
        <h4 style={{ margin: 0 }}>MR Herbal & Naturals</h4>
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
      <button onClick={exportToPDF}>Download Label as PDF</button>
    </div>
  );
}

export default LabelExport;
