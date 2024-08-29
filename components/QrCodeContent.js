import React, { useState } from 'react';
import styles from '../styles/Qrcode.module.css';
import QRCode from 'react-qr-code';
import { SketchPicker } from 'react-color';

const QrCodeContent = () => {
  const [logo, setLogo] = useState(null);
  const [color, setColor] = useState('#000000');
  const [qrCodeData, setQrCodeData] = useState('###');

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width === 205 && img.height === 205) {
        setLogo(URL.createObjectURL(file));
      } else {
        alert('A logónak pontosan 205x205 pixel nagyságúnak kell lennie');
      }
    };
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
  
    // Check if the canvas exists
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      alert('Hiba a QR kód letöltése közben. Kérjük próbálkozzon újra.');
    }
  };
  

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.leftColumn}>
        <div className={styles.itemWrapper}>
          <h3 className={styles.title}>Saját logó feltöltése</h3>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>
        <div className={styles.itemWrapper}>
          <h3 className={styles.title}>Qr kód színe</h3>
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <QRCode
          value={qrCodeData}
          size={256}
          bgColor="transparent"
          fgColor={color}
          renderAs="canvas"
          imageSettings={
            logo
              ? {
                  src: logo,
                  x: null,
                  y: null,
                  height: 50,
                  width: 50,
                  excavate: true,
                }
              : null
          }
        />
        <button onClick={downloadQRCode} className={styles.downloadButton}>Letöltés</button>
      </div>
    </div>
  );
};

export default QrCodeContent;
