import React, { useState, useRef, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { HexColorPicker } from 'react-colorful';
import { AiOutlineUpload } from 'react-icons/ai';
import styles from '../styles/Qrcode.module.css';

const QrCodeComponent = () => {
  const defaultLogo = null;
  const defaultColor = '#000000';
  const defaultQrCodeData = 'http://localhost:3000/Menu';
  
  const [logo, setLogo] = useState(defaultLogo);
  const [color, setColor] = useState(defaultColor);
  const [qrCodeData, setQrCodeData] = useState(defaultQrCodeData);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hexInput, setHexInput] = useState(defaultColor);
  const [currentPlan, setCurrentPlan] = useState('Alap');

  const pickerRef = useRef(); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch the current plan from the API
    fetch('/api/Plan')
      .then((res) => res.json())
      .then((data) => {
        setCurrentPlan(data.currentPlan);
      });
  }, []);

  const handleLogoUpload = (e) => {
    if (currentPlan === 'Prémium') {
      const file = e.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 205 && img.height === 205) {
          setLogo(URL.createObjectURL(file));
        } else {
          alert('The logo must be exactly 205x205 pixels.');
        }
      };
    } else {
      alert('Logó feltöltése csak a Prémium előfizetéssel elérhető.');
    }
  };

  const handleHexInputChange = (e) => {
    if (currentPlan === 'Prémium') {
      const newHex = e.target.value;
      setHexInput(newHex);
      if (/^#[0-9A-F]{6}$/i.test(newHex)) {
        setColor(newHex);
      }
    } else {
      alert('A QR kód színének megváltoztatása csak a Prémium előfizetéssel elérhető.');
    }
  };

  // Function to download the QR Code
  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      alert('There was an issue downloading the QR code. Please try again.');
    }
  };

  const resetQRCode = () => {
    setLogo(defaultLogo);
    setColor(defaultColor);
    setQrCodeData(defaultQrCodeData);
    setHexInput(defaultColor); 
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.leftColumn}>
        <h3 className={styles.subTitle}>Egyedi logó feltöltése</h3>

        {/* Disable file uploader for "Alap" plan */}
        <label className={styles.uploadLabel}>
          <AiOutlineUpload className={styles.uploadIcon} />
          <span>Logó feltöltése</span>
          <input
            ref={fileInputRef}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={currentPlan === 'Alap'} // Disable for Alap plan
          />
        </label>

        <h3 className={styles.subTitle}>QR kód színe</h3>
        <div className={styles.colorPickerWrapper}>
          <input
            type="text"
            className={styles.hexInput}
            value={hexInput}
            onChange={handleHexInputChange}
            maxLength={7}
            disabled={currentPlan === 'Alap'} // Disable for Alap plan
          />
          <div
            className={styles.colorSquare}
            style={{ backgroundColor: color }}
            onClick={() => {
              if (currentPlan === 'Prémium') {
                setShowColorPicker(!showColorPicker);
              } else {
                alert('A QR kód színének megváltoztatása csak a Prémium előfizetéssel elérhető.');
              }
            }}
          ></div>

          {showColorPicker && currentPlan === 'Prémium' && (
            <div ref={pickerRef} className={styles.colorPicker}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightColumn}>
        <QRCode
          value={qrCodeData}
          size={250}
          ecLevel="M"
          fgColor={color}
          logoImage={logo}
          logoWidth={80}
          logoHeight={80}
          qrStyle="dots"
          bgColor="transparent"
          removeQrCodeBehindLogo={true}
          eyeRadius={5}
          logoPaddingStyle="square"
          logoPadding={30}
        />
        <div className={styles.buttonGroup}>
          <button onClick={downloadQRCode} className={styles.downloadButton}>
            Letöltés
          </button>
          <button onClick={resetQRCode} className={styles.downloadButton}>
            Alaphelyzet
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeComponent;
